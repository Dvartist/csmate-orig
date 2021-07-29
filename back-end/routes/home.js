const express = require('express');
const router = express.Router();

router.route('/').get((request, response) => {

    redirectUserToUrl(response, '/html/login.html');

});

function redirectUserToUrl(response,url){
    response.redirect(url);
    response.end();
}

module.exports = router;
