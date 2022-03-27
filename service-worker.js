const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'checkout.html',
  'contact.html',
  'styles/main_styles.css',
  'styles/responsive.css',
  'styles/britney.css'
];
/*Web offline */
self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
      );
    });
    
    self.addEventListener('activate', event => {
      console.log('Service worker activate event!');
    });
    
    self.addEventListener('fetch', event => {
      console.log('Fetch intercepted for:', event.request.url);
      event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return fetch(event.request);
          })
        );
    });
    
/*Web notification & web push */
// TODO 2.6 - Handle the notificationclose event
self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

// TODO 2.7 - Handle the notificationclick event
self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('shopping.html');
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked

});

// TODO 3.1 - add push event listener
self.addEventListener('push', event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Default body';
  }

  const options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'},
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
