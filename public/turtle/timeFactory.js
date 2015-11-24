(function() {
  'use strict';

  angular.module('app')
  .factory('timeFactory', timeFactory);

  timeFactory.$inject = ['$http', 'userFactory'];

  function timeFactory($http, userFactory) {
    var services = {
      getTurtleTimes: getTurtleTimes,
    };

    var globalHotfix = false;
    var globalHotfixDate = '2015-09-17';
    var japanHotfix = false;
    var japanHotfixDate = '2015-09-17';

    return services;

    function getTurtleTimes(cb) {
      var params = {
        params: {
          digit: userFactory.getDigit(),
          timeFormat: userFactory.getTimeFormat(),
          version: userFactory.getVersion(),
          numOfDays: 3,
        },
      }

      $http.get('http://localhost:3000/turtle', params)
      .then(function success(response) {
        var turtleTimes = getFormattedTimes(response.data);
        cb(null, turtleTimes);
      }).catch(function error(err) {
        cb(err);
      });
    }

    function getFormattedTimes(turtleTimes) {
      var timeFormat = userFactory.getTimeFormat();

      return turtleTimes.map(function(timeStr) {
        var time, date;
        var turtleTime = moment.utc(timeStr);
        console.log('turtleTime =', turtleTime);

        if (timeFormat === 'standard')
          time = turtleTime.local().format('h:mm a');
        else if (timeFormat === 'military')
          time = turtleTime.local().format('HH:mm');

        date = turtleTime.local().format('LL');

        return {
          time: time,
          date: date,
        }
      });
    }
  }

})();