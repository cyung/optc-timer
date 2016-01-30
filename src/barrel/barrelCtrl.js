(function() {
  'use strict';

  angular.module('app')
  .controller('BarrelCtrl', barrelCtrl);

  barrelCtrl.$inject = ['$mdMedia', 'userFactory', 'barrelFactory', 'navbarFactory'];

  function barrelCtrl($mdMedia, userFactory, barrelFactory, navbarFactory) {
    var self = this;

    setParams();

    function setParams() {
      navbarFactory.setSeo('Barrel Breaking', 'Look up when to play the friend game with this up-to-date chart.');
      self.version = userFactory.getVersion();
      self.barrelTimes = barrelFactory.getBarrelTimes();
      self.format = userFactory.getDetailedHourStatus();
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.barrelTimes = barrelFactory.getBarrelTimes();
    };

    self.isLargeScreen = function() {
      return $mdMedia('gt-md');
    };

    self.showHours = function() {
      userFactory.setDetailedHourStatus(self.format);
    }
  }

})();