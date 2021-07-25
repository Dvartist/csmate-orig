const session = require('express-session');
let ex_session = require('express-session');
let app = require('express')();

let sessionOptions = {
    secret : 'secret'
}
let sessionMiddleware = ex_session(sessionOptions);
app.use(sessionMiddleware);

app. get('/', (req,res) => {
    let userSessionId = req.session.id
    console.log('User ' + userSessionId + " has accessed site");
    res.end();
})

app.listen('3000', () => {console.log("Listening on port 3000")})