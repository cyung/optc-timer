(function() {
  'use strict';

  angular.module('app')
    .factory('adminFactory', adminFactory);

  adminFactory.$inject = ['$http'];

  function adminFactory($http) {
    var services = {
      addTurtleDate: addTurtleDate,
      addTurtleDates: addTurtleDates,
      removeTurtleDates: removeTurtleDates,
      getTurtleDates: getTurtleDates,
      addQuarter: addQuarter,
    };

    return services;

    function getTurtleDates(cb) {
      $http.get('http://localhost:3000/turtle/date')
        .then(function success(response) {
          var globalDates = [];
          var japanDates = [];

          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].version === 'global') {
              globalDates.push(response.data[i].turtleDate);
            } else {
              japanDates.push(response.data[i].turtleDate);
            }
          }

          cb(null, globalDates, japanDates);
        }).catch(function error() {
          console.log('unable to get turtle dates');
        });
    }


    function addQuarter(cb) {
      var NUM_WEEKS = 13;
      var dates = [];

      var start = moment.utc().startOf('isoWeek');

      for (var i = 0; i < NUM_WEEKS; i++) {
        addDateToArray(dates, start.format('YYYY-MM-DD'), 'global');
        addDateToArray(dates, start.format('YYYY-MM-DD'), 'japan');
        start.add('3', 'days');
        addDateToArray(dates, start.format('YYYY-MM-DD'), 'japan');
        start.add('4', 'days');
      }

      console.log('dates =', dates);
      addTurtleDates(dates, cb);

      function addDateToArray(arr, turtleDate, version) {
        arr.push({
          turtleDate: turtleDate,
          version: version,
        });
      }
    }

    function addTurtleDates(dates, cb) {
      var runCount = 0;
      
      for (var i = 0; i < dates.length; i++) {
        addTurtleDate(dates[i].turtleDate, dates[i].version, function(err) {
          if (err) {
            console.log('err =', err);
          }

          if (++runCount === dates.length) {
            cb();
          }
        })
      }
    }

    function addTurtleDate(dateString, version, cb) {
      var turtleDate = convertToUTC(dateString);
      $http.post('http://localhost:3000/turtle/date', {
        turtleDate: turtleDate,
        version: version,
      }).then(function success() {
        cb(null);
      }).catch(function error() {
        cb('Unable to send message');
      });
    }

    function removeTurtleDates(dates, cb) {
      dates = dates.map(function(date) {
        return {
          turtleDate: convertToUTC(date.turtleDate),
          version: date.version,
        };
      })

      var runCount = 0;
      
      for (var i = 0; i < dates.length; i++) {
        removeTurtleDate(dates[i], function(err) {
          if (err) {
            console.log('err =', err);
          }

          if (++runCount === dates.length) {
            cb();
          }
        });
      }
    }

    function removeTurtleDate(turtleDate, cb) {
      var params = {
        params: turtleDate,
      };

      $http.delete('http://localhost:3000/turtle/date', params)
      .then(function success() {
        cb(null);
      }).catch(function error() {
        cb('Unable to delete ' + params.turtleDate);
      });
    }


    function convertToUTC(dateString) {
      return moment.utc(dateString).format('x');
    }
  }

})();