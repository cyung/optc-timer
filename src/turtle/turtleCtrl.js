(function() {
  'use strict';

  angular.module('app')
  .controller('TurtleCtrl', turtleCtrl);

  turtleCtrl.$inject = ['$scope', 'userFactory', 'timeFactory', 'notificationFactory', 'htmlNotificationFactory', 'calendarFactory', 'navbarFactory'];
  
  function turtleCtrl($scope, userFactory, timeFactory, notificationFactory, htmlNotificationFactory, calendarFactory, navbarFactory) {
    var self = this;

    setParams();

    function setParams() {
      navbarFactory.setSeo('Turtle Time Calculator', 'Determine your upcoming turtle time on this automatically-updating calculator and and receive a push notification on Android or desktop browser.');
      self.timezone = userFactory.getTimeZone();
      self.digit = userFactory.getDigit();
      self.version = userFactory.getVersion();
      self.turtleTimes = [];
      self.notificationStatus = true;
      self.htmlNotificationStatus = userFactory.getHtmlNotificationStatus();
      self.notificationEnabled = notificationFactory.isEnabled();
      self.htmlNotificationEnabled = htmlNotificationFactory.isEnabled();
      getTurtleTimes();
      toggleNotification();
    }

    function toggleNotification() {
      if (self.notificationStatus) {
        notificationFactory.subscribe(function(err) {
          if (err) {
            self.notificationStatus = false;
            console.log(err);
            return;
          }

          console.log('subscribed');
        });
      } else {
        notificationFactory.unsubscribe(function(err) {
          if (err) {
            console.log(err);
            self.notificationStatus = true;
            return;
          }

          console.log('unsubscribed');
        })
      }      
    }

    self.toggleNotification = function() {
      toggleNotification();
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

    self.getCalendar = function() {
      calendarFactory.getCalendar();
    }
  }

})();