(function() {
  'use strict';

  angular.module('app')
  .factory('adminFactory', adminFactory);

  adminFactory.$inject = ['$http'];

  function adminFactory($http) {
    var services = {
      addTurtleDate: addTurtleDate,
      removeTurtleDate: removeTurtleDate,
    };

    return services;

    function addTurtleDate(dateString, cb) {
      var turtleDate = convertToUTC(dateString);
      $http.post('http://localhost:3000/turtle/date', {
        turtleDate: turtleDate,
      }).then(function success() {
        cb(null);
      }).catch(function error() {
        cb('Unable to send message');
      });
    }

    function removeTurtleDate(dateString, cb) {
      var turtleDate = convertToUTC(dateString);
      $http.delete('http://localhost:3000/turtle/date', {
        turtleDate: turtleDate,
      }).then(function success() {
        cb(null);
      }).catch(function error() {
        cb('Unable to delete ' + dateString);
      });
    }

    function convertToUTC(dateString) {
      return moment.utc(dateString).format('x');
    }
  }

})();