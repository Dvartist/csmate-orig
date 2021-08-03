const lectureDays = require('./data').lectureDays;
const daysModel = require('./models').days;

function start(){
    let mongoose = require('mongoose');

    let databaseUri = process.env.REMOTEDB_URI;

    mongoose.connect(databaseUri, {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex : true}).then(
        (response) => { // eslint-disable-line
            console.log('Database Connected');
            populateDays();
        }
    ).catch(err =>  console.log(err));
}

async function populateDays() {

    const daysInDB = await daysModel.find({}).exec();

    if(daysInDB.length == 0){

        await daysModel.insertMany(lectureDays, (err, data) => {
            if(err) console.log(err);
            if(data) console.log(data);
        });

    }

    return; 
}


module.exports.start = start;