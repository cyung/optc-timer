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
      self.version = userFactory.getVersion();
      self.turtleTimes = [];
      // self.notificationStatus = userFactory.getNotificationStatus();
      self.notificationStatus = false;
      self.notificationEnabled = notificationFactory.checkNotificationEnabled();
      getTurtleTimes();
    }

    function getTurtleTimes() {
      timeFactory.getTurtleTimes(function(err, turtleTimes) {
        if (err) {
          console.log('unable to retrieve times');
          return;
        }

        self.turtleTimes = turtleTimes;
      });
    }

    self.updateDigit = function() {
      userFactory.setDigit(self.digit);
      getTurtleTimes();
    };

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      getTurtleTimes();
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