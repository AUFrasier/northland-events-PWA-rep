/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    )
    if (answer === true) {
      window.location.reload()
    }
  }
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
                      icon: 'link-to-your-icon',
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