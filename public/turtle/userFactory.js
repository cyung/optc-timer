(function() {
  'use strict';

  angular.module('app')
  .factory('userFactory', userFactory);

  function userFactory(localStorageService) {
    var services = {
      getTimeZone: getTimeZone,
      getDigit: getDigit,
      setDigit: setDigit,
      getTimeFormat: getTimeFormat,
      setTimeFormat: setTimeFormat,
      getVersion: getVersion,
      setVersion: setVersion,
    };

    var digit;
    var timeFormat;
    var version;
    loadFromStorage();

    return services;

    function loadFromStorage() {
      digit = localStorageService.get('digit') || 0;
      timeFormat = localStorageService.get('timeFormat') || 'standard';
      version = localStorageService.get('version') || 'global';
    }

    function getTimeZone() {
      return jstz.determine().name();
    }

    function getDigit() {
      return digit;
    }

    function setDigit(d) {
      digit = d % 5;
      localStorageService.set('digit', d);
    }

    function getTimeFormat() {
      return timeFormat;
    }

    function setTimeFormat(tf) {
      timeFormat = tf;
      localStorageService.set('timeFormat', tf);
    }

    function getVersion() {
      return version;
    }

    function setVersion(v) {
      version = v;
      localStorageService.set('version', v);
    }
  }

})();