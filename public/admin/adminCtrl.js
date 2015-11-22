(function() {
  'use strict';

  angular.module('app')
  .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['adminFactory'];

  function AdminCtrl(adminFactory) {
    var self = this;

    self.addDate = function() {
      var date = self.turtleDate.toISOString().slice(0, 10);
      adminFactory.addTurtleDate(date, function() {
        console.log('wee');
      });
    }
  }

})();