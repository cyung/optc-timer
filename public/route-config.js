(function() {
  'use strict';


  angular.module('app')
  .config(config);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/turtle');

    $stateProvider
      .state('turtle', {
        url: '/turtle',
        templateUrl: 'turtle/turtle.html',
        controller: 'TurtleCtrl',
        controllerAs: 'turtle',
        data: {
          title: 'Turtle Time'
        }
      })
      .state('barrel', {
        url: '/barrel',
        templateUrl: 'barrel/barrel.html',
        controller: 'BarrelCtrl',
        controllerAs: 'barrel',
        data: {
          title: 'Barrel Breaking'
        }
      })
      .state('events', {
        url: '/events',
        templateUrl: 'events/events.html',
        controller: 'EventsCtrl',
        controllerAs: 'events',
        data: {
          title: 'Events'
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'contact/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact',
        data: {
          title: 'Contact'
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        data: {
          title: 'Settings'
        }
      });

  }
})();