(function() {
  'use strict';

  angular.module('app')
  .controller('ContactCtrl', contactCtrl);

  contactCtrl.$inject = [];

  function contactCtrl() {
    var self = this;

    self.message = {
      name: '',
      email: '',
      subject: '',
      version: '',
    }
  }

})();