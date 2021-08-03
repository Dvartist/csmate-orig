let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let course = new Schema({
    courseCode: String,
    courseName: String,
    lecturerName: String
});

let period = new Schema({
    startTime: String,
    endTime: String,
    lectureRoom: String,
    course: course
});

let day = new Schema({
    day: {
        type:Number,
    },
    periods:[period]
}, {
    collection: 'days'
});

let users = new Schema({
    userToken: {
        type : String,
        unique: true
    }
}, {    
    collections: 'users'
});

module.exports.days = mongoose.model('days', day);
module.exports.users = mongoose.model('users',users);
