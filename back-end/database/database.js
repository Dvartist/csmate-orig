function start(){
    let mongoose = require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/notification-app', {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true}).then(
        (response) => { // eslint-disable-line
            console.log('Database Connected');
        }
    ).catch(err =>  console.log(err));
}

module.exports.start = start;