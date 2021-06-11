let express = require('express');
let app = express();

app.use('/', express.static('./front-end/'));

app.get('/', (req, res) => {
   res.redirect('/login.html');
   res.end();
});

app.listen(3000, (err) => {
    console.log('listening on port 3000');
})

