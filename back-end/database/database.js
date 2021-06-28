module.exports.start = () => {
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/notification-app', {useNewUrlParser: true, useUnifiedTopology:true}).then(
    (response) => {
        console.log('Database Connected');
     }
    ).catch(err =>  console.log(err));
}