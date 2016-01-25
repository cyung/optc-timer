(function() {
  'use strict';

  angular.module('app')
  .controller('SettingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['userFactory'];

  function settingsCtrl(userFactory) {
    var self = this;
    self.timeFormat = userFactory.getTimeFormat();
    self.htmlNotificationSoundStatus = userFactory.getHtmlNotificationSoundStatus();
    self.timeBeforeNotification = userFactory.getTimeBeforeNotification();

    self.setTimeFormat = function() {
      userFactory.setTimeFormat(self.timeFormat);
    };

    self.setHtmlNotificationSoundStatus = function() {
      userFactory.setHtmlNotificationSoundStatus(self.htmlNotificationSoundStatus);
    }

    self.updateTimeBefereNotification = function() {
      userFactory.setTimeBeforeNotification(self.timeBeforeNotification);
    }

  }

})();