self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  var title = 'OPTC Timer';  
  var body = 'Turtle time reminder';  
  var icon = 'images/flag.png';  

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,
      icon: icon,
    })
  );  
});