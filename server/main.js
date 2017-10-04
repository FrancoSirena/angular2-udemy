var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var dbUser = require('./db/user');
var expressJwt = require('express-jwt');
var jwtConfig = require('./config/jwt.js');

app.use(express.static('dist'));

app.set('port', process.env.PORT || 2999);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/signup', function (req, res, next) {
    var credentials = {username: req.body.username, password: req.body.password };
    dbUser.signUp(credentials)
        .then((resp) =>  res.send({stauts: 'ok'}))
        .catch((err) => res.sendStatus(401));
})

app.post('/api/authenticate', function(req, res, next) {
    var credentials = req.body.credentials;
    dbUser.authenticate(credentials)
        .then((token) => res.send({token: token }))
        .catch((err) => res.sendStatus(401));
});

app.get('/api/profile',
    expressJwt({secret: jwtConfig.privateKey}),
    function(req, res, next) {
        res.send('yeyeyeyeye');
})

app.use(function(req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

var server = require('http').createServer(app);

server.listen(app.get('port'), function() {
    console.log('Listening port 2999')
});