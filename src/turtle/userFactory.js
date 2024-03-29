(function() {
  'use strict';

  angular.module('app')
  .factory('userFactory', userFactory);

  userFactory.$inject = ['localStorageService', '$http', 'apiFactory', '$translate'];

  function userFactory(localStorageService, $http, apiFactory, $translate) {
    var services = {
      getTimeZone: getTimeZone,
      getDigit: getDigit,
      setDigit: setDigit,
      getTimeFormat: getTimeFormat,
      setTimeFormat: setTimeFormat,
      getVersion: getVersion,
      setVersion: setVersion,
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
      getDetailedHourStatus: getDetailedHourStatus,
      setDetailedHourStatus: setDetailedHourStatus,
      getLocale: getLocale,
      setLocale: setLocale,
      getPassword: getPassword,
      setPassword: setPassword,
    };

    var digit;
    var timeFormat;
    var version;
    var htmlNotificationStatus;
    var htmlNotificationSoundStatus;
    var turtleTimes;
    var timeBeforeNotification;
    var registrationId;
    var detailedHourStatus;
    var locale;
    var password;
    loadFromStorage();

    return services;

    function loadFromStorage() {
      digit = localStorageService.get('digit') || 0;
      timeFormat = localStorageService.get('timeFormat') || 'standard';
      version = localStorageService.get('version') || 'global';
      htmlNotificationStatus = localStorageService.get('htmlNotificationStatus') || false;
      htmlNotificationSoundStatus = localStorageService.get('htmlNotificationSoundStatus') || false;
      timeBeforeNotification = localStorageService.get('timeBeforeNotification') || 10;
      detailedHourStatus = localStorageService.get('detailedHourStatus') || false;
      locale = localStorageService.get('locale') || 'en';
      $translate.use(locale);
      moment.locale(locale);
      password = localStorageService.get('password') || '';
    }

    function postUserData() {
      var data = {
        digit: digit%5,
        registrationId: registrationId,
        timeBefore: timeBeforeNotification,
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
      postUserData();
    }

    function getRegistrationId() {
      return registrationId;
    }

    function setRegistrationId(r) {
      registrationId = r;
      postUserData(); 
    }

    function getDetailedHourStatus() {
      return detailedHourStatus;
    }

    function setDetailedHourStatus(d) {
      detailedHourStatus = d;
      localStorageService.set('detailedHourStatus', d);
    }

    function getLocale() {
      return locale;
    }

    function setLocale(l) {
      locale = l;
      localStorageService.set('locale', l);
      $translate.use(l);
      moment.locale(locale);
    }

    function getPassword() {
      return password;
    }

    function setPassword(p) {
      password = p;
      localStorageService.set('password', p);
    }
  }

})();