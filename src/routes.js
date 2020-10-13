const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const auth = require('./middlewares/auth')

const AuthenticationController = require('./controllers/AuthenticationController.js');
const UserController = new require('./controllers/UserController.js');

var jsonParser = bodyParser.json()

router.get("/", (req, res) => res.send("APIv1 service is online..."));

router.post('/login', jsonParser, function (req, res, next) {
    AuthenticationController.login(req, res);
})

router.delete('/logout', auth, function (req, res, next) {
    AuthenticationController.logout(req, res);
})

router.get("/user", auth, (req, res, next) => UserController.get(req, res));

module.exports = router