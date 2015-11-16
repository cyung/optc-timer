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
      getNotificationStatus: getNotificationStatus,
      setNotificationStatus: setNotificationStatus,
    };

    var digit;
    var timeFormat;
    var version;
    var notificationStatus;
    loadFromStorage();

    return services;

    function loadFromStorage() {
      digit = localStorageService.get('digit') || 0;
      timeFormat = localStorageService.get('timeFormat') || 'standard';
      version = localStorageService.get('version') || 'global';
      notificationStatus = localStorageService.get('notificationStatus') || false;
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

    function getNotificationStatus() {
      return notificationStatus;
    }

    function setNotificationStatus(n) {
      notificationStatus = n;
    }
  }

})();