(function() {
  'use strict';

  angular.module('app')
  .controller('ContactCtrl', contactCtrl);

  contactCtrl.$inject = ['$http', 'apiFactory'];

  function contactCtrl($http, apiFactory) {
    var self = this;

    self.subjects = [
      'Incorrect Turtle Time',
      'Report a bug',
      'Other',
    ];

    self.message = {};


    self.isTurtleBug = function() {
      if (self.message.subject === undefined)
        return false;
      return self.message.subject === 'Incorrect Turtle Time';
    }

    self.sendMessage = function() {
      self.status = 'Sending...';
      $http.post(apiFactory.getBaseUrl() + '/contact', self.message)
      .then(function success() {
        self.status = 'Sent!';
      }).catch(function error() {
        self.status = 'Error sending. Please try again later.';
      });
    }
  }

})();