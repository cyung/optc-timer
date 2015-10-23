(function() {
  'use strict';

  angular.module('app')
  .controller('NavbarCtrl', navbarCtrl);

  navbarCtrl.$inject = ['$state', '$mdSidenav'];

  function navbarCtrl($state, $mdSidenav) {
    var self = this;

    self.menu = [
      {
        link: 'turtle',
        title: 'Turtle Time',
        icon: 'home'
      },
      {
        link: 'barrel',
        title: 'Barrel Breaking',
        icon: 'stars'
      },
      {
        link: 'events',
        title: 'Events',
        icon: 'event'
      },
      {
        link: 'contact',
        title: 'Contact',
        icon: 'email'
      },
      {
        link: 'settings',
        title: 'Settings',
        icon: 'settings'
      }
    ];

    self.isSelected = function(title) {
      if (!$state.current.hasOwnProperty('data'))
        return false;

      self.title = $state.current.data.title;
      return (title === $state.current.data.title);
    };

    self.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };

  }

})();