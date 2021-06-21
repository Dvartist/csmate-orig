// in two minutes, let browser notifiy me of the time
function notify_me(){
if('Notification' in window){
    alert("Notification Supported");

    let permission = Notification.requestPermission();
    permission.then(
        (response) => {
            if(response == 'granted'){
                console.log('Permission Granted')
                registerServiceWorker('./sw.js').catch(err => console.log(err));
            }
        }
    )    
}else {
    alert("Notification Not Supported, Please Update Your Browser");
}

let registerServiceWorker = function
    (swPath) {
        if('serviceWorker' in navigator){
            alert("Service Workers Supported");
            return navigator.serviceWorker.register(swPath).then(
                console.log('Registered Service Worker')
            );
         }else {
            alert("Service Workers Not Supported, Please Update Your Browser");
        }
    }
}