var schedule = require('node-schedule');
var TurtleDate = require('./db/TurtleDate');
var User = require('./db/User');
var request = require('request');
var rp = require('request-promise');
var moment = require('moment');

var j = schedule.scheduleJob('*/1 * * * *', function() {
  console.log('printing every minute');

  var options = {
    url: 'http://localhost:3000/api/turtle',
    qs: {
      digit: 0,
      version: 'global',
    },
    json: true,
  };

  getUpcomingTimes().then(function(upcomingTimes) {
    for (var i = 0; i < 5; i++) {
      notifyUsers(i, upcomingTimes[i]);
    }
  });

});

function notifyUsers(digit, upcomingTime) {
  if (!isTenMinutesPrior(upcomingTime))
    return;

  User.find({digit: digit}, function(err, data) {
    if (err) {
      console.log('Unable to find users with digit ' + digit, err);
    }

    var registrationIds = data.map(function(item) {
      return item.registrationId;
    });

    var options = {
      url: 'http://localhost:3000/api/gcm',
      method: 'POST',
      json: {
        registrationIds: registrationIds,
      },
    };

    rp(options);

  });
}

function isTenMinutesPrior(upcomingTime) {
  var now = moment.utc();

  if (!now.isBefore(upcomingTime))
    return false;

  var minutes = upcomingTime.diff(now, 'minutes');
  return minutes === 10;
}

// TO-DO: GCM for japan turtle times
function getUpcomingTimes() {
  var now = moment().utc();
  var upcomingTimes = [];
  var count = 0;
  return new Promise(function(resolve, reject) {
    for (var i = 0; i < 5; i++) {
      aux(i, 'global', function() {
        if (count === 5)
          resolve(upcomingTimes);
      });
    }


  });

  function aux(digit, version, cb) {
    var options = {
      url: 'http://localhost:3000/api/turtle',
      qs: {
        digit: digit,
        version: 'global',
      },
      json: true,
    };

    return rp(options).then(function(dates) {
      var i = 0;
      upcomingTimes[digit] = moment.utc(dates[i]);
      while (now.isAfter(upcomingTimes[digit])) {
        upcomingTimes[digit] = moment.utc(dates[++i]);
      }
      count++;
      cb();
    }).catch(function(err) {
      console.log('Error retrieving date');
      count++;
      cb();
    });
  }
}
