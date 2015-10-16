(function() {
  'use strict';

  angular.module('app')
  .controller('ContactCtrl', contactCtrl);

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