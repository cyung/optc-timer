(function() {
  'use strict';

  angular.module('app')
  .controller('NavbarCtrl', navbarCtrl);

  navbarCtrl.$inject = ['$state', '$mdSidenav', '$translate', '$scope', 'userFactory', 'navbarFactory'];

  function navbarCtrl($state, $mdSidenav, $translate, $scope, userFactory, navbarFactory) {
    var self = this;
    self.seo = navbarFactory.getSeo();

    activate();

    function activate() {
      self.menu = [
        {
          link: 'turtle',
          title: $translate.instant('NAV_TURTLE'),
          icon: 'fa-home'
        },
        {
          link: 'barrel',
          title: $translate.instant('NAV_BARREL'),
          icon: 'fa-users'
        },
        {
          link: 'events',
          title: $translate.instant('NAV_EVENT'),
          icon: 'fa-calendar-o'
        },
        {
          link: 'contact',
          title: $translate.instant('NAV_CONTACT'),
          icon: 'fa-envelope'
        },
        {
          link: 'settings',
          title: $translate.instant('NAV_SETTINGS'),
          icon: 'fa-cogs'
        }
      ];
    }

    self.isSelected = function(title) {
      if (!$state.current.hasOwnProperty('data'))
        return false;

      self.title = $translate.instant($state.current.data.title);
      return (title === self.title);
    };

    self.toggleSidenav = function() {
      $mdSidenav('left').toggle();
    };

    $scope.$watch(function() {
      return userFactory.getLocale();
    }, function() {
      activate();
    });

  }

})();