(function() {
  'use strict';

  angular.module('app')
  .controller('EventsCtrl', eventsCtrl);

  function eventsCtrl($mdMedia, userFactory, eventsFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.version = userFactory.getVersion();
      self.eventTimes = eventsFactory.getEventTimes();
      console.log('self.eventTimes =', self.eventTimes);
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.eventTimes = eventsFactory.getEventTimes();
    }

    self.isLargeScreen = function() {
      return $mdMedia('gt-md');
    };
  }

})();