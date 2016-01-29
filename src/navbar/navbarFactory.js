(function() {
  'use strict';

  angular.module('app')
  .factory('navbarFactory', navbarFactory);

  navbarFactory.$inject = ['$translate', 'userFactory'];

  function navbarFactory($translate, userFactory) {
    var services = {
      getMenu: getMenu,
    };

    var menu;

    getMenu();

    return services;

    function getMenu($translate) {
      menu = [
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
  }

})();