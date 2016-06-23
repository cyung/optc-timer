var express = require('express');
var router = express.Router();
var moment = require('moment');
var TurtleDate = require('../db/TurtleDate');
var NodeCache = require('node-cache');
var turtleCache = new NodeCache({
  stdTTL: 10,
  checkperiod: 11,
});
var ADMIN_PASSWORD = require('../config.json').ADMIN_PASSWORD;

router.get('/', function(req, res, next) {
  var version = req.query.version;
  var digit = req.query.digit % 5;
  var key = version + 'Dates' + digit;
  var turtleDates = turtleCache.get(key);

  if (turtleDates) {
    console.log('loaded data from cache');
    return res.send(turtleDates);
  }

  TurtleDate.find({version: version})
  .sort({turtleDate: '1'})
  .exec(function(err, data) {
    if (err) {
      console.log('error retrieving turtle dates');
      return res.sendStatus(400);
    }

    setTurtleDates(data, req.query);

    res.send(turtleCache.get(key));
  });
});

function setTurtleDates(data, options) {
  var version = options.version || 'global';
  var numOfDays = options.numOfDays || 4;
  var digit = (options.digit || 0) % 5;
  var dates = [];

  dates = data.map(function(item) {
    return item.turtleDate.getTime();
  });

  // get index for first upcoming turtle time
  var now = moment.utc().format('x');
  var index = 0;

  // increment the index according to the number of days in the past
  while ((index < dates.length) && (now>dates[index])) {
    index++;
  }

  // generate hour offset using index
  var offset = --index % 5;
  var digitOrder = [0,1,2,3,4];

  for (var i = 0; i < offset; i++) {
    digitOrder.unshift(digitOrder.pop());
  }

  // convert dates to moment objects and get most recent numOfDays
  numOfDays = (version === 'japan') ? numOfDays*2 : numOfDays;
  dates = dates.splice(index, numOfDays);
  dates = dates.map(function(date) {
    return moment.utc(date);
  });

  var turtleDates = [];

  if (version === 'global') {
    for (var i = 0; i < dates.length; i++) {
      turtleDates.push(dates[i].add(13+digitOrder[digit]*2, 'hours').format());
      turtleDates.push(dates[i].add(10, 'hours').format());
      digitOrder.unshift(digitOrder.pop());
    }

    turtleCache.set('globalDates' + digit, turtleDates);
  } else {
    for (var i = 0; i < dates.length; i++) {
      turtleDates.push(dates[i].add(digitOrder[digit]*3, 'hours').format());
      digitOrder.unshift(digitOrder.pop());
    }

    turtleCache.set('japanDates' + digit, turtleDates);
  }
}

router.get('/date', function(req, res, next) {
  TurtleDate.find({})
  .sort({turtleDate: '-1'})
  .exec(function(err, data) {
    if (err) {
      console.log('error retrieving turtle dates');
      return res.sendStatus(400);
    }

    var dates = data.map(function(date) {
      return {
        turtleDate: date.turtleDate.toISOString().slice(0, 10),
        version: date.version,
      };
    });

    res.send(dates);
  });
});

router.post('/date', function(req, res, next) {
  if (!req.body.password || (req.body.password !== ADMIN_PASSWORD)) {
    return res.sendStatus(400);
  }

  var query = {
    turtleDate: new Date(+req.body.turtleDate),
    version: req.body.version,
  };

  console.log('query =', query);

  TurtleDate.find(query, function(err, data) {
    if (err) {
      console.log('error retrieving turtle dates', err);
      res.sendStatus(400);
    } else if (data.length) {
      console.log('date already exists');
      res.sendStatus(400);
    } else {
      new TurtleDate(query)
      .save(function(err) {
        if (err) {
          console.log('err =', err);
          return res.sendStatus(400);
        }
        console.log('Turtle date saved');
        res.sendStatus(200);
      })
    }
  });

});

// router.delete('/date/all', function(req, res, next) {
//   TurtleDate.remove({}, function(err) {
//     if (err) {
//       console.log('err =', err);
//       return res.sendStatus(400);
//     }

//     console.log('successfully removed all entries');
//     res.sendStatus(200);
//   })
// });

router.delete('/date', function(req, res, next) {
  if (!req.query.password || (req.query.password !== ADMIN_PASSWORD)) {
    return res.sendStatus(400);
  }

  var query = {
    turtleDate: new Date(+req.query.turtleDate),
    version: req.query.version,
  };

  console.log('query =', query);

  TurtleDate.remove(query, function(err) {
    if (err) {
      console.log('err =', err);
      return res.sendStatus(400);
    }

    console.log('turtle date removed');
    res.sendStatus(200);
  });
});


module.exports = router;
