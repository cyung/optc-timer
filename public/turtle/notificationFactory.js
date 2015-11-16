(function() {
  'use strict';

  angular.module('app')
  .factory('notificationFactory', notificationFactory);

  notificationFactory.$inject = ['$http', 'userFactory'];

  function notificationFactory($http, userFactory) {
    var services = {
      checkNotificationEnabled: checkNotificationEnabled,
      togglePush: togglePush,

    };

    var notificationEnabled = true;
    setup();


    return services;

    function setup() {
      if ('serviceWorker' in navigator) {  
        navigator.serviceWorker.register('service-worker.js')  
        .then(initialiseState);
      } else {  
        console.warn('Service workers aren\'t supported in this browser.');  
        notificationEnabled = false;
      }
    }

    function checkNotificationEnabled() {
      return notificationEnabled;
    }

    // Once the service worker is registered set the initial state  
    function initialiseState() {
      // Are Notifications supported in the service worker?  
      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
        console.warn('Notifications aren\'t supported.');  
        return;  
      }

      // Check the current Notification permission.  
      // If its denied, it's a permanent block until the  
      // user changes the permission  
      if (Notification.permission === 'denied') {  
        console.warn('The user has blocked notifications.');  
        return;  
      }

      // Check if push messaging is supported  
      if (!('PushManager' in window)) {  
        console.warn('Push messaging isn\'t supported.');  
        return;  
      }

      console.log('initializing');

      // We need the service worker registration to check for a subscription  
      console.log('navigator.serviceWorker.ready =', navigator.serviceWorker.ready);
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
        console.log('serviceWorker ready in start');
        // Do we already have a push message subscription?  
        serviceWorkerRegistration.pushManager.getSubscription()  
          .then(function(subscription) {  
            console.log('serviceWorker retrieved subscription');
            // Enable any UI which subscribes / unsubscribes from  
            // push messages.  
            // var pushButton = document.querySelector('.js-push-button');  
            // pushButton.disabled = false;

            if (!subscription) {  
              // We aren't subscribed to push, so set UI  
              // to allow the user to enable push  
              return;  
            }

            // Keep your server in sync with the latest subscriptionId
            sendSubscriptionToServer(subscription);

            // Set your UI to show they have subscribed for  
            // push messages  
            // pushButton.textContent = 'Disable Push Messages';  
            // isPushEnabled = true;  
          })  
          .catch(function(err) {  
            console.warn('Error during getSubscription()', err);  
          });  
      });
    }

    function sendSubscriptionToServer(subscription) {
      var endpoint = subscription.endpoint;
      var registrationId = '';

      if (endpoint.match(/^https:\/\/android\.googleapis\.com\/gcm\/send/)) {
        registrationId = endpoint.match(/(?:.*?)send\/(.*)$/)[1];
        endpoint = 'https://android.googleapis.com/gcm/send';
      }

      var data = {
        endpoint: endpoint,
        registrationId: registrationId,
      };

      $http.post('http://localhost:3000/users', data)
      .then(function success() {
        console.log('posted subscription to srever');
      })
      .catch(function error() {
        console.log('error posting subscription to server');
      });
    }

    function togglePush(cb) {
      console.log('toggling push');
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
        console.log('serviceWorker is ready');
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
        })  
          .then(function(subscription) {  
            // The subscription was successful  
            console.log('subscription successful');
            cb(true);

            // TODO: Send the subscription.endpoint to your server  
            // and save it to send a push message at a later date
            // return sendSubscriptionToServer(subscription);  
          })  
          .catch(function(e) {  
            if (Notification.permission === 'denied') {  
              // The user denied the notification permission which  
              // means we failed to subscribe and the user will need  
              // to manually change the notification permission to  
              // subscribe to push messages  
              console.warn('Permission for Notifications was denied');  
              cb(false);
            } else {
              // A problem occurred with the subscription; common reasons  
              // include network errors, and lacking gcm_sender_id and/or  
              // gcm_user_visible_only in the manifest.  
              console.error('Unable to subscribe to push.', e);  
              cb(false);
            }
          });
      });      
    }
}
    
})();