const express = require('express');
const router = express.Router();

router.route('/').get((request, response) => {
    redirectUserToUrl(response, '/login.html');
});

function redirectUserToUrl(response,url){
    response.redirect(url);
    response.end();
}

module.exports = router;
