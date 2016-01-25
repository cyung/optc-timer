(function() {
  'use strict';

  angular.module('app')
  .controller('TurtleCtrl', turtleCtrl);

  turtleCtrl.$inject = ['$scope', 'userFactory', 'timeFactory', 'notificationFactory', 'htmlNotificationFactory'];
  
  function turtleCtrl($scope, userFactory, timeFactory, notificationFactory, htmlNotificationFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.timezone = userFactory.getTimeZone();
      self.digit = userFactory.getDigit();
      self.version = userFactory.getVersion();
      self.turtleTimes = [];
      self.notificationStatus = userFactory.getNotificationStatus();
      self.htmlNotificationStatus = userFactory.getHtmlNotificationStatus();
      self.notificationEnabled = notificationFactory.checkEnabled();
      self.htmlNotificationEnabled = htmlNotificationFactory.checkEnabled();
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

      self.notificationEnabled = false;
      notificationFactory.togglePush(function(notificationStatus) {
        self.notificationStatus = notificationStatus;
        userFactory.setNotificationStatus(self.notificationStatus);
        self.notificationEnabled = true;
      });
    }

    self.updateHtmlNotificationStatus = function() {
      userFactory.setHtmlNotificationStatus(self.htmlNotificationStatus);
      htmlNotificationFactory.setNotifications();
    }

    self.playExampleNotification = function() {
      notificationFactory.playExample();
    }

    self.playExampleHtmlNotification = function() {
      htmlNotificationFactory.playExample();
    }
  }

})();