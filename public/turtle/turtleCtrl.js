(function() {
  'use strict';

  angular.module('app')
  .controller('TurtleCtrl', turtleCtrl);

  turtleCtrl.$inject = ['$scope', 'userFactory', 'timeFactory', 'notificationFactory'];
  
  function turtleCtrl($scope, userFactory, timeFactory, notificationFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.timezone = userFactory.getTimeZone();
      self.digit = userFactory.getDigit();
      self.timeFormat = userFactory.getTimeFormat();
      self.version = userFactory.getVersion();
      self.turtleTimes = timeFactory.getTurtleTimes();
      // self.notificationStatus = userFactory.getNotificationStatus();
      self.notificationStatus = false;
      self.notificationEnabled = notificationFactory.checkNotificationEnabled();
    }
    
    self.updateDigit = function() {
      userFactory.setDigit(self.digit);
      self.turtleTimes = timeFactory.getTurtleTimes();
    };

    self.updateTimeFormat = function() {
      userFactory.setTimeFormat(self.timeFormat);
      self.turtleTimes = timeFactory.getTurtleTimes();
    };

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.turtleTimes = timeFactory.getTurtleTimes();
    };

    self.updateNotificationStatus = function() {
      console.log('self.notificationStatus =', self.notificationStatus);
      if (!self.notificationStatus)
        return;

      console.log('toggling push');
      self.notificationEnabled = false;
      notificationFactory.togglePush(function(notificationStatus) {
        console.log('toggled push');
        self.notificationStatus = notificationStatus;
        userFactory.setNotificationStatus(self.notificationStatus);
        self.notificationEnabled = true;
      });
    }
  }

})();