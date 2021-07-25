const express = require('express');
const http = require('http');
const axios = require('axios');
const router = express.Router();

router.route('/').get((request, response) => {

    redirectUserToUrl(response, '/html/dashboard.html');

});

function redirectUserToUrl(response,url){
    response.redirect(url);
    response.end();
}

module.exports = router;
