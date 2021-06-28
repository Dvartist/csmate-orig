const router = require('express').Router();
const webpush = require('web-push');
const fs = require('fs');

const publicVapidKey = "BKQBAogEsMrx29cKrjScrp2T0EhQauqyyrheyn5RYWkZ66XXscYaBCEEE12D0CR3HafGwURqvf8BnPv1oVoyyu8";
const privateVapidKey = "arbmw-bxxDUBKAZqeIPHmF8x6hBSe-Nc1ukeiRUa_j8";

let dbFunctions = require('../functions/nextClassFunctions');

function getMessageFromRequest(){
    /*let message = request.body.message;
    console.log(message);
    return message;*/


    return new Promise((resolve, reject) => {
        let message = dbFunctions.getMessageForNextPeriod();
        resolve(message);
    });
}

router.route('/').post((request, response) => {
    
    getMessageFromRequest()
    .then(
        (message) => {
            getPushServiceSubscription()
            .then(
                (recievedPushSubscription) => {
                        console.log('Sending msg to pushservice')
                        sendMessageToPushService(recievedPushSubscription, message);
                        response.end();
                }
            ).catch(err => console.log(err))
        }
    );
    
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
    .then(response => {
        console.log(response);
    })
    .catch(err =>{console.log(err)})
}

module.exports = router;