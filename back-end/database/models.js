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
    start_time: String,
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

module.exports = mongoose.model('days', day);