const axios = require('axios');
const users = require('../database/models').users;
const getLectureAtTime = require('./getLectureAtTime').getLectureAtTime;

async function sendNotification(){

    let date = new Date();
    let lecture = await getLectureAtTime(date);

    let thereisMessage = !(lecture == null);

    if(thereisMessage){

        let clickActionUri = '/';
        let dbUsers = await users.find({});

        let messageBody = `${lecture.course.courseCode} ${lecture.course.courseName} has started \n`;
        messageBody = messageBody + `Room: ${lecture.lectureRoom}`;


        if(dbUsers.length !== 0){

            dbUsers.forEach(
                (user) => {
                    let messageEndpoint = 'https://fcm.googleapis.com/fcm/send';
                    let messageRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Authorization': `key=${process.env.FCM_AUTH}`
                        },
                        data : {
                            'notification': {
                                'title':'Lecture Schedule Reminder',
                                'body': `${messageBody}`,
                                'click-action' : `${clickActionUri}`
                            },
                            'to': `${user.userToken}`
                        }
                    };
    
                    axios.request(messageEndpoint, messageRequestOptions)
                        .then(
                            (response) => { //eslint-disable-line
                                //console.log('Sent push message');
                            }
                        )
                        .catch(
                            (err) => {
                                console.log(err);
                            }
                        );
    
                }
            );
        }

    }
}  

module.exports.start = () => {

    const timeToCheckNotification = 10000;

    setInterval(
        async () => {
            
            await sendNotification();
        
        }, timeToCheckNotification );
    
};
