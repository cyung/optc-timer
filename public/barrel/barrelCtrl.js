(function() {
  'use strict';

  angular.module('app')
  .controller('BarrelCtrl', barrelCtrl);

  function barrelCtrl($mdMedia, userFactory, barrelFactory) {
    var self = this;

    setParams();

    function setParams() {
      self.version = userFactory.getVersion();
      self.barrelTimes = barrelFactory.getBarrelTimes();
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.barrelTimes = barrelFactory.getBarrelTimes();
    };

    self.isLargeScreen = function() {
      return $mdMedia('gt-md');
    };
  }

})();