const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios')

require('./back-end/database/database.js').start();

app.use('/', express.static(path.join(__dirname, '/front-end/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'my-secret',
    cookie: {
        maxAge: 1209600000
    }
}));

let routeHandler = {
    home: require('./back-end/routes/home'),
    saveUserToDb: require('./back-end/routes/saveUserToDb'),
    getLecture: require('./back-end/routes/getLecture')
};

app.use('/', routeHandler.home);
app.use('/getLecture', routeHandler.getLecture);
app.use('/saveUserToDb', routeHandler.saveUserToDb);

app.listen(3000, (err) => {
    if(err) console.log(err);
    console.log('listening on port 3000');
});

require('./back-end/functions/sendNotification').start();

