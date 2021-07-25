async function populateDB() {
  
    require('./database').start();
    let lectureDays = require('./data.json').lectureDays;
    let daysModel =  require('./models.js').days;
      
    await daysModel.deleteMany({});

    daysModel.insertMany(lectureDays, (err, data) => {
        if(err) console.log(err);
        if(data) console.log(data);
    });
}

populateDB();

//module.exports.populateDB = populateDB;