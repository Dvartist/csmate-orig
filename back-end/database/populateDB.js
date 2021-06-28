require('./database.js')();
let daysModel =  require('./models.js').days;

function populateDB() {
    
    daysModel.deleteMany()
    .then(
        () => {
            console.log("Successfully Emptied Database");

            let monday = new daysModel({day: 0});

            mondayFirstCourse = {
                course_code: "CSM 354",
                course_name: "Computer Graphics",
                lecturer_name: "N. USSIPH"
            }

            mondayFirstPeriod = {
                start_hour:12,
                start_minute:0,
                classroom_name:"SCB-FF1",
                course: mondayFirstCourse
            }

            mondaySecondCourse = {
                course_code: "CSM 388",
                course_name: "Data Structures II",
                lecturer_name: "JB Hayfron Acquah"
            }

            mondaySecondPeriod = {
                start_hour:13,
                start_minute:30,
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

module.exports.populateDB = populateDB;
