let days = require('../database/models').days;

let message;

function findNextClassFromNow(currentDate){

    return new Promise((resolve, reject) => {

            message = "No Class From Now";
    
            let currentDay = currentDate.getDay();
            
            days.findOne()
            .where('day').equals(currentDay)
            .then((day) => {
                day.periods.forEach((currentPeriod) => {
                    let isNextPeriod = checkNextPeriod(currentPeriod, currentDate)
                    if(isNextPeriod){
                        setMessageForNextPeriod(currentPeriod);
                        resolve();
                    };
                        reject();
                }
                );
            })
            .catch(err => { 
                console.log(err, "No Day Found")
                reject(err)
            });
    })
}

function checkNextPeriod(period, currentTime){

        let periodStartTime = new Date();
        periodStartTime.setHours(period.start_hour, period.start_minute, 0);

        let isNextPeriod = currentTime < periodStartTime;

        if(isNextPeriod){
            return true;
        }

}


function setMessageForNextPeriod(period){

    let periodStartTime = new Date();
    periodStartTime.setHours(period.start_hour, period.start_minute, 0);


    let  startHour = periodStartTime.getHours();
    let startMinute = periodStartTime.getMinutes();
    let startTime = startHour + ":" + startMinute;

    let course = period.course;

    let course_code = course.course_code;
    let course_name = course.course_name;
    let lecturer_name = course.lecturer_name;

    message = course_code + " starts at " + startTime;
    
}

function getMessageForNextPeriod(){

    let currentDate = new Date();

    return findNextClassFromNow(currentDate)
            .then(() => {
                return message
            })
             .catch(() => {
                 return message
             })
}

module.exports.getMessageForNextPeriod = getMessageForNextPeriod;




