(function() {
  'use strict';

  angular.module('app')
  .controller('NavbarCtrl', navbarCtrl);

  navbarCtrl.$inject = ['$state', '$mdSidenav', '$translate'];

  function navbarCtrl($state, $mdSidenav, $translate) {
    var self = this;

    self.menu = [
      {
        link: 'turtle',
        title: $translate.instant('NAV_TURTLE'),
        icon: 'home'
      },
      {
        link: 'barrel',
        title: $translate.instant('NAV_BARREL'),
        icon: 'stars'
      },
      {
        link: 'events',
        title: $translate.instant('NAV_EVENT'),
        icon: 'event'
      },
      {
        link: 'contact',
        title: $translate.instant('NAV_CONTACT'),
        icon: 'email'
      },
      {
        link: 'settings',
        title: $translate.instant('NAV_SETTINGS'),
        icon: 'settings'
      }
    ];

    self.isSelected = function(title) {
      if (!$state.current.hasOwnProperty('data'))
        return false;

      self.title = $translate.instant($state.current.data.title);
      return (title === self.title);
    };

    self.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };

  }

})();