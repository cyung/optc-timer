(function() {
  'use strict';

  angular.module('app')
  .controller('EventsCtrl', eventsCtrl);

  function eventsCtrl(userFactory, eventsFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.version = userFactory.getVersion();
      self.eventTimes = eventsFactory.getEventTimes();
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.eventTimes = eventsFactory.getEventTimes();
    }
  }

})();