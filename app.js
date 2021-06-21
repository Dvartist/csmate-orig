let express = require('express');
let app = express();
let bodyParser = require('body-parser');


/*let dbFunctions = require('./back-end/database/populateDB.js');
dbFunctions.showNextClass();*/

app.use('/', express.static('./front-end/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.redirect('/login.html');
    res.end();
});

app.route('/postUserPushSubscription').post(
    (req, res) => {
        console.log(req.body);
        res.end();
    }
)

app.listen(3000, (err) => {
    console.log('listening on port 3000');
});

