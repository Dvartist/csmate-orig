const publicVapidKey = "BKQBAogEsMrx29cKrjScrp2T0EhQauqyyrheyn5RYWkZ66XXscYaBCEEE12D0CR3HafGwURqvf8BnPv1oVoyyu8";
const privateVapidKey = "arbmw-bxxDUBKAZqeIPHmF8x6hBSe-Nc1ukeiRUa_j8";
const selfRegistration = self.registration;

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}


self.addEventListener('install', () => {
  console.log('Installing Service Worker');
});

self.addEventListener('activate', () => {
  console.log('Activated Service Worker');

  configurePush();
  
})

function configurePush(){
  getPushSubscription()
  .then(
    (recievedPushSubscription) => {
      console.log(recievedPushSubscription);
      saveUserPushSubscriptionToDatabase(recievedPushSubscription);
    }
  ).catch(err => {console.log(err)});
}

self.addEventListener('push', (event) => {

  console.log('Recieved Push');

  let notificationMessage = event.data.text();
  let notificationOptions = {
    body : notificationMessage,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    icon: "./images/icons8-naruto-64.png"
  }
  let title = "Message From Admin";
  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
    );
})

 function getPushSubscription(){

      return new Promise(
        (resolve, reject) => {
          
          let pushManager = self.registration.pushManager
          
          pushManager.getSubscription()
            .then(
              (recievedSubscription) => {
    
              if(recievedSubscription != null){
                resolve(recievedSubscription);
              }else {
                
                const subscriptionOptions = {
                  userVisibleOnly: true,
                  applicationServerKey: urlB64ToUint8Array(publicVapidKey)
                }
    
                pushManager.subscribe(subscriptionOptions)
                .then(
                  (recievedPushSubscription) => {
                    resolve(recievedPushSubscription);
                  }
                ).catch(
                  (err) => {
                    reject(err);
                  }
                );
              }
            }
          ).catch(
            (err) => {
              reject(err);
            }
          )
            }
          )
        }
      
function saveUserPushSubscriptionToDatabase(pushSubscription){

  let saveToDBRequest = new Request('/saveUserPushSubscription', {
    method: 'POST', 
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(pushSubscription)
  });

  
  fetch(saveToDBRequest)
  .then((recievedResponse) => {
    console.log(recievedResponse)
  });

}