const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

router.route('/').post((request, response) => {
    let subscription = request.body;
    console.log(subscription);
    let stringSubscription = JSON.stringify(subscription)
    saveSubToDatabase(stringSubscription);
    response.end();
    }
);

function saveSubToDatabase(subscription){
    fs.writeFile('tmp.txt', subscription, (err) => {
        if(err) console.log(err)
    })
}

module.exports = router;