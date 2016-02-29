(function() {
  'use strict';

  angular.module('app')
  .factory('notificationFactory', notificationFactory);

  notificationFactory.$inject = ['$http', 'userFactory', 'apiFactory'];

  function notificationFactory($http, userFactory, apiFactory) {
    var services = {
      isEnabled: isEnabled,
      subscribe: subscribe,
      unsubscribe: unsubscribe,
      playExample: playExample,
    };

    var reg;
    var sub;


    return services;

    function isEnabled() {
      return 'serviceWorker' in navigator;
    }

    function attachWorker() {
      return new Promise(function(resolve, reject) {
        if (isEnabled()) {
          navigator.serviceWorker.register('service-worker.js')  
          .then(function() {
            return navigator.serviceWorker.ready;
          }).then(function(serviceWorkerRegistration) {
            reg = serviceWorkerRegistration;
            console.log('Service Worker is ready.');
            resolve();
          }).catch(function(err) {
            console.log('Service Worker Error.');
            reject(err);
          });
        } else {
          reject('service workers not supported');
        }
      });
    }

    function subscribe(cb) {
      if (!isEnabled())
        return 'notifications not enabled';

      if (!reg) {
        attachWorker().then(function() {
          aux();
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        aux();
      }

      function aux() {
        reg.pushManager.getSubscription().then(function(pushSubscription) {
          if (pushSubscription) {
            sub = pushSubscription;
            sendSubscriptionToServer();
            return cb(null);
          }

          reg.pushManager.subscribe({userVisibleOnly: true})
          .then(function(pushSubscription) {
            sub = pushSubscription;
            console.log('endpoint =', sub.endpoint);
            console.log('Subscribed.');
            sendSubscriptionToServer();
            cb(null);
          }).catch(function(err) {
            console.log('Unable to subscribe.');
            cb(err);
          });
        });
      }
    }

    function unsubscribe(cb) {
      if (!isEnabled())
        return 'notifications not enabled';
      sub.unsubscribe().then(function(event) {
        console.log('Unsubscribed.', event);
        cb(null);
      }).catch(function(err) {
        console.log('Error unsubscribing.');
        cb(err);
      });
    }

    function sendSubscriptionToServer() {
      var endpoint = sub.endpoint;

      if (endpoint.match(/^https:\/\/android\.googleapis\.com\/gcm\/send/)) {
        var registrationId = endpoint.match(/(?:.*?)send\/(.*)$/)[1];
        endpoint = 'https://android.googleapis.com/gcm/send';
        userFactory.setRegistrationId(registrationId);
      }

    }


    function playExample() {
      var data = {
        registrationIds: [userFactory.getRegistrationId()],
      };

      console.log('data =', data);

      $http.post(apiFactory.getBaseUrl() + '/api/gcm', data)
      .then(function success() {
        console.log('sent to server');
      })
      .catch(function error() {
        console.log('error posting to server');
      });
    }
}

})();