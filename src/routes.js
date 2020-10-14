const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const auth = require('./middlewares/auth')

const AuthenticationController = require('./controllers/AuthenticationController.js');
const UserController = new require('./controllers/UserController.js');
const StudentController = new require('./controllers/StudentController.js');
const TeacherController = new require('./controllers/TeacherController.js');

var jsonParser = bodyParser.json()
// var urlParser = bodyParser.urlencoded();

router.get("/", (req, res) => res.send("APIv1 service is online..."));

// AUTHENTICATION
router.post('/login', jsonParser, function (req, res, next) {
    AuthenticationController.login(req, res);
})

router.delete('/logout', auth, function (req, res, next) {
    AuthenticationController.logout(req, res);
})


// USER

router.get("/user", auth, (req, res, next) => UserController.get(req, res));
router.get("/users", auth, (req, res, next) => UserController.list(req, res));
router.get("/users/count", auth, (req, res, next) => UserController.count(req, res));


router.get("/students/count", auth, (req, res, next) => StudentController.count(req, res));


router.get("/teachers/count", auth, (req, res, next) => TeacherController.count(req, res));

module.exports = router