let express = require('express');
let app = express();
let bodyParser = require('body-parser');

require("./back-end/database/database.js").start();

app.use('/', express.static('./front-end/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let routeHandler = {
    home: require('./back-end/routes/home'),
    saveUserPushSubscription: require('./back-end/routes/saveUserPushSubscription'),
    sendNotification: require('./back-end/routes/sendNotification')
}

app.use('/sendNotification', routeHandler.sendNotification );
app.use('/', routeHandler.home);
app.use('/saveUserPushSubscription', routeHandler.saveUserPushSubscription);

app.listen(3000, (err) => {
    console.log('listening on port 3000');
});

