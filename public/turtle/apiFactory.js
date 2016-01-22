(function() {
  'use strict';

  angular.module('app')
  .factory('apiFactory', apiFactory);

  apiFactory.$inject = [];

  function apiFactory() {
    var services = {
      getBaseUrl: getBaseUrl,
    };

    return services;

    function getBaseUrl() {
      if (document.location.hostname == 'localhost')
        return 'http://localhost:3000';
      else
        return 'https://optctimer.com';
    }
  }

})();