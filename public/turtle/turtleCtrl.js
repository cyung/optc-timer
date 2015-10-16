(function() {
  'use strict';

  angular.module('app')
  .controller('TurtleCtrl', turtleCtrl);

  function turtleCtrl($scope, userFactory, timeFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.timezone = userFactory.getTimeZone();
      self.digit = userFactory.getDigit();
      self.timeFormat = userFactory.getTimeFormat();
      self.version = userFactory.getVersion();
      self.turtleTimes = timeFactory.getTurtleTimes();
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
  }

})();