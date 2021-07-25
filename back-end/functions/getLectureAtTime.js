const lectureDays = require('../database/models').days;

async function getLectureAtTime(time){
    
    let givenDay = time.getDay();
    let givenTime = getGivenTime(time);

    let searchResults = 
    await lectureDays.findOne(
        {'day':givenDay},
        {'periods': {$elemMatch : {
            $or : [
                {'startTime' : { $lt : givenTime } },
                {'startTime' : { $eq : givenTime } }
            ],
            'endTime': {$gt : givenTime}
        }} }
    ).exec();

    let lecture = searchResults.periods[0];
    
    if(lecture === undefined){
        return null;
    }else {
        return lecture;
    }
}

function getGivenTime(time){

    let isoString = time.toISOString();
    let isoTime = isoString.split('T')[1];

    return isoTime;
}

async function getNextLectureFromNow(time){

    let givenDay = time.getDay();
    let givenTime = getGivenTime(time);

    let searchResults = 
    await lectureDays.findOne(
        {'day':givenDay},
        {'periods': {$elemMatch : {
            'startTime': {$gt : givenTime}
        }} }
    ).exec();

    let lecture = searchResults.periods[0];

    if(lecture == undefined){
        return null;
    }else {
        return lecture;
    }
}

module.exports.getLectureAtTime = getLectureAtTime;
module.exports.getNextLectureFromNow = getNextLectureFromNow;