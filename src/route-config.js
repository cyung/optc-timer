(function() {
  'use strict';


  angular.module('app')
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/turtle');

    $stateProvider
      .state('turtle', {
        url: '/turtle',
        templateUrl: 'turtle/turtle.html',
        controller: 'TurtleCtrl',
        controllerAs: 'turtle',
        data: {
          title: 'NAV_TURTLE'
        }
      })
      .state('barrel', {
        url: '/barrel',
        templateUrl: 'barrel/barrel.html',
        controller: 'BarrelCtrl',
        controllerAs: 'barrel',
        data: {
          title: 'NAV_BARREL'
        }
      })
      .state('events', {
        url: '/events',
        templateUrl: 'events/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events',
        data: {
          title: 'NAV_EVENT'
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'contact/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        data: {
          title: 'NAV_CONTACT'
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        data: {
          title: 'NAV_SETTINGS'
        }
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin',
        data: {
          title: 'Admin'
        }
      });

  }
})();