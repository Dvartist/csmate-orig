// request permission from user to allow notifications

if('Notification' in window){
    Notification.requestPermission().then((access) => {
        if(access = 'granted') console.log('Access Granted');
        else console.log('Access Denied');
    });
}

// register a service worker and check it's default path

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service Worker Registration Success');
            console.log('Path controlled by service Worker ', registration.scope);
        }
    ).catch(err => {
        console.log('Registration Failed: ', err);
    });
}