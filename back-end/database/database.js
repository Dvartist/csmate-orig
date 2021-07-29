function start(){
    let mongoose = require('mongoose');

    let databaseUri = process.env.LOCALDB_URI;

    mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true}).then(
        (response) => { // eslint-disable-line
            console.log('Database Connected');
        }
    ).catch(err =>  console.log(err));
}

module.exports.start = start;