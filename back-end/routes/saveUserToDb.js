const express = require('express');
const router = express.Router();
const userModel = require('../database/models').users;


router.route('/').post(async (request, response) => {

    let userToken = request.body.token;

    let searchResults = await userModel.find({
        userToken : userToken
    }).exec();

    if(searchResults.length == 0){

        userModel.create({
            userToken : userToken
        }, (err, doc) => {
            if(err) {
                console.log(err);
            }
        });

    }

    response.end();

}
);


module.exports = router;