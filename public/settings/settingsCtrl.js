(function() {
  'use strict';

  angular.module('app')
  .controller('SettingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['userFactory'];

  function settingsCtrl(userFactory) {
    var self = this;

    self.languages = [
      {
        language: 'English',
        abbrev: 'en',
      },
      {
        language: 'Deutsche',
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