(function() {
  'use strict';

  angular.module('app')
  .controller('SettingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['userFactory'];

  function settingsCtrl(userFactory) {
    var self = this;
    self.timeFormat = userFactory.getTimeFormat();

    self.updateTimeFormat = function() {
      userFactory.setTimeFormat(self.timeFormat);
    };

  }

})();