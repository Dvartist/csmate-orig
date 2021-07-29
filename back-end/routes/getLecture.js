const router = require('express').Router();
const getLectureAtTime = require('../functions/getLectureAtTime').getLectureAtTime;
const getNextLectureFromNow = require('../functions/getLectureAtTime').getNextLectureFromNow;


router.route('/').post(
    async (request, response) => {

        let queryParams = request.query;
        let date = new Date();

        if(queryParams.time == 'now'){

            let lecture = await getLectureAtTime(date);
            lecture = JSON.stringify(lecture);
            response.json(lecture);
            response.end();

        }else if(queryParams.time == 'next'){

            let lecture = await getNextLectureFromNow(date);
            lecture = JSON.stringify(lecture);
            response.json(lecture);
            response.end();
        }
    }
);

module.exports = router;