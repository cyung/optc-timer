(function() {
  'use strict';

  angular.module('app')
  .factory('notificationFactory', notificationFactory);

  notificationFactory.$inject = ['userFactory'];

  function notificationFactory(userFactory) {
    var services = {
      checkPermissions: checkPermissions,
      setNotification: setNotification,
    };

    return services;

    function checkPermissions() {
      if (typeof ServiceWorkerRegistration === 'undefined')
        return false;

      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications are not supported.');
        return false;
      }

      if (Notification.permission === 'denied') {
        console.warn('Notifications are blocked.');
        return false;
      }

      if (!('PushManager' in window)) {
        console.warn('Push messaging is not supported.');
        return false;
      }

      if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register()
      }
      return true;
    }

    function setNotification() {
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {

          if (!subscription) {
            console.log('not subscribed to push');
            return;
          }

          sendSubscriptionToServer(subscription);
        })
        .catch(function(err) {
          console.warn(err);
        });
      });
    }

  }

})();