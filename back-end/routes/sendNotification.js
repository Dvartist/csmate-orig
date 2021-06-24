const router = require('express').Router();
const webpush = require('web-push');
const fs = require('fs');

const publicVapidKey = "BKQBAogEsMrx29cKrjScrp2T0EhQauqyyrheyn5RYWkZ66XXscYaBCEEE12D0CR3HafGwURqvf8BnPv1oVoyyu8";
const privateVapidKey = "arbmw-bxxDUBKAZqeIPHmF8x6hBSe-Nc1ukeiRUa_j8";

function getMessageFromRequest(request){
    let message = request.body.message;
    console.log(message);
    return message;
}

router.route('/').post((request, response) => {
    const message = getMessageFromRequest(request);
    getPushServiceSubscription()
    .then(
        (recievedPushSubscription) => {
            sendMessageToPushService(recievedPushSubscription, message);
            response.end();
        }
    ).catch(err => console.log(err))
});

function getPushServiceSubscription(){
    return new Promise((resolve, reject) => {
        fs.readFile('tmp.txt', (err, data) => {
            if(err) reject (err)
            resolve (JSON.parse(data));
        })
    })
}

function sendMessageToPushService(pushServiceSubscription, message){
    webpush.setVapidDetails('mailto:winstonlamptey3@gmail.com', publicVapidKey, privateVapidKey);
    webpush.sendNotification(pushServiceSubscription, message)
}

module.exports = router;