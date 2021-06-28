let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let course = new Schema({
    course_code: String,
    course_name: String,
    lecturer_name: String
}, {
    collection: 'courses'
});

let period = new Schema({
    start_hour: Number,
    start_minute: Number,
    course: course,
    classroom_name: String
}, {
    collection:'periods'
});

let day = new Schema({
    day: {
        type:Number,
        unique: true
    },
    periods:[period]
}, {
    collection: 'days'
});

let userSubscriptions = new Schema({
    
}, {collections: 'userSubscriptions'})

module.exports.days = mongoose.model('days', day);
module.exports.userSubscriptions = mongoose.model('userSubscriptions',userSubscriptions);