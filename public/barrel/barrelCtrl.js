(function() {
  'use strict';

  angular.module('app')
  .controller('BarrelCtrl', barrelCtrl);

  function barrelCtrl(userFactory, barrelFactory) {
    var self = this;

    self.query = {
      filter: '',
      order: 'date',
    };

    setParams();

    function setParams() {
      self.version = userFactory.getVersion();
      self.barrelTimes = barrelFactory.getBarrelTimes();
    }

    self.updateVersion = function() {
      userFactory.setVersion(self.version);
      self.barrelTimes = barrelFactory.getBarrelTimes();
    };
  }

})();