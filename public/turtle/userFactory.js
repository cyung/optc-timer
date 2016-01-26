(function() {
  'use strict';

  angular.module('app')
  .factory('userFactory', userFactory);

  userFactory.$inject = ['localStorageService', '$http', 'apiFactory'];

  function userFactory(localStorageService, $http, apiFactory) {
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
      getHtmlNotificationStatus: getHtmlNotificationStatus,
      setHtmlNotificationStatus: setHtmlNotificationStatus,
      getHtmlNotificationSoundStatus: getHtmlNotificationSoundStatus,
      setHtmlNotificationSoundStatus: setHtmlNotificationSoundStatus,
      getTurtleTimes: getTurtleTimes,
      setTurtleTimes: setTurtleTimes,
      getTimeBeforeNotification: getTimeBeforeNotification,
      setTimeBeforeNotification: setTimeBeforeNotification,
      getRegistrationId: getRegistrationId,
      setRegistrationId: setRegistrationId,
    };

    var digit;
    var timeFormat;
    var version;
    var notificationStatus;
    var htmlNotificationStatus;
    var htmlNotificationSoundStatus;
    var turtleTimes;
    var timeBeforeNotification;
    var registrationId;
    loadFromStorage();

    return services;

    function loadFromStorage() {
      digit = localStorageService.get('digit') || 0;
      timeFormat = localStorageService.get('timeFormat') || 'standard';
      version = localStorageService.get('version') || 'global';
      // notificationStatus = localStorageService.get('notificationStatus') || false;
      notificationStatus = false;
      htmlNotificationStatus = localStorageService.get('htmlNotificationStatus') || false;
      htmlNotificationSoundStatus = localStorageService.get('htmlNotificationSoundStatus') || false;
      timeBeforeNotification = localStorageService.get('timeBeforeNotification') || 10;
    }

    function postUserData() {
      var data = {
        digit: digit%5,
        registrationId: registrationId,
      };

      $http.post(apiFactory.getBaseUrl() + '/api/users', data)
      .then(function success() {
        console.log('posted subscription to server');
      })
      .catch(function error() {
        console.log('error posting subscription to server');
      });
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
      postUserData();
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
      localStorageService.set('notificationStatus', n);
    }

    function getHtmlNotificationStatus() {
      return htmlNotificationStatus;
    }

    function setHtmlNotificationStatus(h) {
      htmlNotificationStatus = h;
      localStorageService.set('htmlNotificationStatus', h);
    }

    function getTurtleTimes() {
      return turtleTimes;
    }

    function setTurtleTimes(tt) {
      turtleTimes = tt;
    }

    function getHtmlNotificationSoundStatus() {
      return htmlNotificationSoundStatus;
    }

    function setHtmlNotificationSoundStatus(s) {
      htmlNotificationSoundStatus = s;
      localStorageService.set('htmlNotificationSoundStatus', s);
    }

    function getTimeBeforeNotification() {
      return timeBeforeNotification;
    }

    function setTimeBeforeNotification(t) {
      timeBeforeNotification = t;
      localStorageService.set('timeBeforeNotification', t);
    }

    function getRegistrationId() {
      return registrationId;
    }

    function setRegistrationId(r) {
      registrationId = r;
      postUserData(); 
    }
  }

})();