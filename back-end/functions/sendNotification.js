const axios = require('axios');
const users = require('../database/models').users;
const getLectureAtTime = require('./getLectureAtTime').getLectureAtTime;

async function sendNotification(){

    let date = new Date();

    let lecture = await getLectureAtTime(date);

    let clickActionUri = 'http://localhost:3000';
    let dbUsers = await users.find({});

    console.log(lecture);
    let messageBody = `${lecture.course.courseCode} ${lecture.course.courseName} has started \n`;
    messageBody = messageBody + `Room: ${lecture.lectureRoom}`;

    let isMessage = lecture !== '{}';

    if(isMessage){

        if(dbUsers.length !== 0){

            dbUsers.forEach(
                (user) => {
                    let messageEndpoint = 'https://fcm.googleapis.com/fcm/send';
                    let messageRequestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Authorization': 'key=AAAAqYfe_Xs:APA91bHDGS0syupVE3-LsyAC8jm614IH9u1nH_WiURihf5EwXgzf5onfQ1fzA84pmrAeD95t9P2zbS5nJtaH8dji_tCMKglM6nuJgRDLeaxMkHvOnjQtVwQxS0r3U4yP8du4RhvFQDhx'
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
                                console.log('Sent push message');
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

    const timeToCheckNotification = 1800000;

    setInterval(
        async () => {
            
            await sendNotification();
        
        }, timeToCheckNotification );
    
};
