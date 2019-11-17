// show a notification after 15 seconds (the notification
// permission must be granted first)
setTimeout(() => {
    self.registration.showNotification("Hello, world!")
    }, 15000)
function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification('Hello world!');
        });
    }
}
displayNotification();

  export const onServiceWorkerUpdateFound = () => {
    const showNotification = () => {
      Notification.requestPermission(result => {
          if (result === 'granted') {
              navigator.serviceWorker.ready.then(registration => {
                  registration.showNotification('Update', {
                      body: 'New content is available!',
                      icon: 'src/images/gatsby-icon.png',
                      vibrate: [200, 100, 200, 100, 200, 100, 400],
                      tag: 'request',
                      data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1
                      },
                      actions: [ // you can customize these actions as you like
                        {
                            action: 'explore', 
                            title: 'View',
                        },
                        {
                            action: 'close',
                            title: 'Close notification',
                        },
                      ]
                  })
              })
          }
      })
    }
  
    showNotification()
  }
