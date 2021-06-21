const publicVAPIDKey = "BKQBAogEsMrx29cKrjScrp2T0EhQauqyyrheyn5RYWkZ66XXscYaBCEEE12D0CR3HafGwURqvf8BnPv1oVoyyu8";
const privateVAPIDKey = "arbmw-bxxDUBKAZqeIPHmF8x6hBSe-Nc1ukeiRUa_j8";

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

self.addEventListener('install', (event) => {

            console.log('Currently Running Service Worker');

            setTimeout(
                () => {
                    let title = "Current Date";
                    let notificationOptions = {
                        body: "It's Monday Suckers"
                    }
                    self.registration.showNotification(title, notificationOptions);
                }
                , 10000)    
})