self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  var data = event.data.json();
  var title = data.title;
  var body = data.body || data.message;
  var icon = 'images/flag.png';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,
      icon: icon,
    })
  );
});