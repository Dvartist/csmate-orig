const router = require('express').Router();
const exam = require('../database/data.json').exams;

router.route('/').get((request, response) => {
    // get details for said week
    let weekRequest = request.query.week;

    if(weekRequest == 1){
        let weekDetails = exam[0];
        response.json(weekDetails);
        response.end();
    } 

    if(weekRequest == 2){
        let weekDetails = exam[1];
        response.json(weekDetails);
        response.end();
    }
});

module.exports = router;