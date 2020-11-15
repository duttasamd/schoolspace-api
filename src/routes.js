const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const auth = require('./middlewares/auth')

const AuthenticationController = require('./controllers/AuthenticationController.js');
const SectionController = require('./controllers/SectionController');
const StandardController = require('./controllers/StandardController');
const CourseController = require('./controllers/CourseController');
const GroupController = require('./controllers/GroupController');
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
router.get("/users/staffcount", auth, (req, res, next) => UserController.staffCount(req, res));

// GROUP
router.get("/groups/count", auth, (req, res, next) => GroupController.count(req, res));
router.get("/groups", auth, (req, res, next) => GroupController.list(req, res));

// STUDENT 

router.get("/students", auth, (req, res, next) => StudentController.list(req, res));
router.get("/students/count", auth, (req, res, next) => StudentController.count(req, res));


// TEACHER

router.get("/teachers", auth, (req, res, next) => TeacherController.list(req, res));
router.get("/teachers/count", auth, (req, res, next) => TeacherController.count(req, res));


// STANDARD

router.get("/standards/count", auth, (req, res, next) => StandardController.count(req, res));


// SECTION

router.get("/sections/count", auth, (req, res, next) => SectionController.count(req, res));


// COURSE

router.get("/coursesection/get/:id", auth, (req, res, next) => CourseController.getCourseSection(req, res));
router.get("/courses/listforuser", auth, (req, res, next) => CourseController.listForUser(req, res));

module.exports = router