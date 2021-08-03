require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT;

(
    async () => {
        await require('./back-end/database/database.js').start();
    }
)();

app.use('/', express.static(path.join(__dirname, '/front-end/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let routeHandler = {
    home: require('./back-end/routes/home'),
    saveUserToDb: require('./back-end/routes/saveUserToDb'),
    getLecture: require('./back-end/routes/getLecture'),
    getExamDetails: require('./back-end/routes/getExamDetails')
};

app.use('/', routeHandler.home);
app.use('/getLecture', routeHandler.getLecture);
app.use('/saveUserToDb', routeHandler.saveUserToDb);
app.use('/getExamDetails', routeHandler.getExamDetails);

app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log('listening on port ' + PORT);
});

require('./back-end/functions/sendNotification').start();

