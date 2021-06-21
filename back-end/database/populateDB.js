require('./database.js')();
let daysModel =  require('./models.js');

async function populateDB() {
    
    daysModel.deleteMany()
    .then(
        () => {
            console.log("Successfully Emptied Database");

            let monday = new daysModel({day: 1});

            mondayFirstCourse = {
                course_code: "CSM 354",
                course_name: "Computer Graphics",
                lecturer_name: "N. USSIPH"
            }

            mondayFirstPeriod = {
                start_time:"8:00am",
                classroom_name:"SCB-FF1",
                course: mondayFirstCourse
            }

            mondaySecondCourse = {
                course_code: "CSM 388",
                course_name: "Data Structures II",
                lecturer_name: "JB Hayfron Acquah"
            }

            mondaySecondPeriod = {
                start_time:"10:30am",
                classroom_name:"SCB-FF1",
                course: mondaySecondCourse
            }

            monday.periods = [mondayFirstPeriod, mondaySecondPeriod];

            monday.save()
            .then((document) => {
                console.log('Successfully Created Document');
            })
            .catch(err => {
                console.log(err);
            });

        }
    )
    }


function showNextClass(){

    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentHour = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();

    daysModel.find({day:1}).exec(
        (response) => console.log(response)
    );
}

module.exports.populateDB = populateDB;
module.exports.showNextClass = showNextClass;