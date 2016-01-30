(function() {
  'use strict';

  angular.module('app')
  .controller('SettingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['userFactory', 'navbarFactory'];

  function settingsCtrl(userFactory, navbarFactory) {
    var self = this;

    self.languages = [
      {
        language: 'English',
        abbrev: 'en',
      },
      {
        language: 'Deutsch',
        abbrev: 'de',
      },
      {
        language: 'Español',
        abbrev: 'es',
      },
      {
        language: 'français',
        abbrev: 'fr',
      },
    ];

    navbarFactory.setSeo('Settings', 'Adjust your language and customize your notification settings.');
    self.timeFormat = userFactory.getTimeFormat();
    self.htmlNotificationSoundStatus = userFactory.getHtmlNotificationSoundStatus();
    self.timeBeforeNotification = userFactory.getTimeBeforeNotification();
    self.locale = userFactory.getLocale();

    self.setTimeFormat = function() {
      userFactory.setTimeFormat(self.timeFormat);
    };

    self.setHtmlNotificationSoundStatus = function() {
      userFactory.setHtmlNotificationSoundStatus(self.htmlNotificationSoundStatus);
    }

    self.updateTimeBefereNotification = function() {
      userFactory.setTimeBeforeNotification(self.timeBeforeNotification);
    }

    self.updateLocale = function() {
      userFactory.setLocale(self.locale);
    }

  }

})();