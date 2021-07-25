importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyB2v8-eybZT8l8CK65Ki1YbGYFoNpR3YgM',
    authDomain: 'notification-app-a3790.firebaseapp.com',
    projectId: 'notification-app-a3790',
    storageBucket: 'notification-app-a3790.appspot.com',
    messagingSenderId: '728129011067',
    appId: '1:728129011067:web:68a1f7df273167213751de',
    measurementId: 'G-VV3QSXGJCZ'
};

firebase.initializeApp(firebaseConfig);

self.addEventListener('install', () => {
  console.log('Installing Service Worker');
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(

    (payload) => {
        console.log('BackgroundMessage: ', payload);
    }
    
);

/*

old-manual method


const publicVapidKey = 'BO2BjK2xKZoiDMjwYooM7FjVjURZ2XXOhBV4rSuTpeoaQ3GtfW-v9Bs36Qkj2B18YnvuMAXLqLvIcIbsJE-81aQ';
const privateVapidKey = 'ZP4s8CKbaAWSEPVaPxRiNRoLoa3gUkVnBaIh_ycNClI';
const selfRegistration = self.registration;

const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

self.addEventListener('install', () => {
    console.log('Installing Service Worker');
});

self.addEventListener('activate', () => {
    console.log('Activated Service Worker');

    configurePush();
  
});

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
        icon: '/front-end/images/icons8-naruto-64.png'
    };
    let title = 'Message From Admin';
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

*/