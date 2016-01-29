var schedule = require('node-schedule');
var TurtleDate = require('./db/TurtleDate');
var User = require('./db/User');
var request = require('request');
var rp = require('request-promise');
var moment = require('moment');

var notificationJob = schedule.scheduleJob('*/1 * * * *', function() {
  getUpcomingTimes().then(function(upcomingTimes) {
    for (var i = 0; i < 5; i++) {
      notifyUsers(i, upcomingTimes[i]);
    }
  });

});

var clearOldDbJob = schedule.scheduleJob('* */1 * * *', function() {
  var past = moment().subtract(3, 'days').format('x');
  User.find({'updatedAt': {'$lt': past}}, function(err, data) {
    if (err) {
      return console.log('Error finding users', err);
    }
  });
})

function notifyUsers(digit, upcomingTime) {
  minutesUntil = getMinutesUntil(upcomingTime);
  
  if (minutesUntil > 120)
    return;


  User.find({digit: digit, timeBefore: minutesUntil}, function(err, data) {
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

function getMinutesUntil(upcomingTime) {
  var now = moment.utc();

  if (!now.isBefore(upcomingTime))
    return 999;

  return upcomingTime.diff(now, 'minutes');
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
