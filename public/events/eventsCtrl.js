(function() {
  'use strict';

  angular.module('app')
  .controller('EventsCtrl', eventsCtrl);

  eventsCtrl.$inject = ['$mdMedia', 'userFactory', 'eventsFactory'];
  
  function eventsCtrl($mdMedia, userFactory, eventsFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.version = userFactory.getVersion();
      self.eventTimes = eventsFactory.getEventTimes();
      self.format = userFactory.getDetailedHourStatus();
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.eventTimes = eventsFactory.getEventTimes();
    }

    self.isLargeScreen = function() {
      return $mdMedia('gt-md');
    };

    self.showHours = function() {
      userFactory.setDetailedHourStatus(self.format);
    }
  }

})();