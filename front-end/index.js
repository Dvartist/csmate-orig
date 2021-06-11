// request permission from user to allow notifications

if('Notification' in window){
    Notification.requestPermission().then((access) => {
        if(access = 'granted') console.log('Access Granted');
        else console.log('Access Denied');
    });
}