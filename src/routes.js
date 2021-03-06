const express = require('express')
const router = express.Router()
const auth = require('./middlewares/auth')
const bodyParser = require('body-parser')

const AuthenticationController = require('./controllers/AuthenticationController.js');
const FileController = new require('./controllers/FileController.js');
const SectionController = require('./controllers/SectionController');
const StandardController = require('./controllers/StandardController');
const CourseController = require('./controllers/CourseController');
const GroupController = require('./controllers/GroupController');
const ForumController = require('./controllers/ForumController');
const CourseContentController = require('./controllers/CourseContentController');
const AttendanceController = require('./controllers/AttendanceController');
const UserController = new require('./controllers/UserController.js');
const StudentController = new require('./controllers/StudentController.js');
const TeacherController = new require('./controllers/TeacherController.js');

var jsonParser = bodyParser.json()

// AUTHENTICATION
router.post('/refreshtoken', jsonParser, (req, res, next) =>
    AuthenticationController.refreshAccessToken(req, res).catch(next)
);

router.delete('/logout', function (req, res, next) {
    AuthenticationController.logout(req, res, next);
})

// FILES
router.get("/sign-s3", (req, res, next) => FileController.getSignedUrl(req, res));
router.delete("/remove-s3/:id", (req, res, next) => FileController.remove(req, res));


// USER

router.get("/user", (req, res, next) => UserController.get(req, res));
router.get("/user/:username", (req, res, next) => UserController.get(req, res));
router.get("/users", auth.isAdmin, (req, res, next) => UserController.list(req, res));
router.get("/users/count", auth.isAdmin, (req, res, next) => UserController.count(req, res).catch(next));
router.get("/users/staffcount", auth.isAdmin, (req, res, next) => UserController.staffCount(req, res));

// GROUP
router.get("/groups/count", auth.isAdmin, (req, res, next) => GroupController.count(req, res));
router.get("/groups", auth.isAdmin, (req, res, next) => GroupController.list(req, res));

// STUDENT 

router.get("/students", auth.isAdmin, (req, res, next) => StudentController.list(req, res));
router.get("/students/count", auth.isAdmin, (req, res, next) => StudentController.count(req, res));


// TEACHER

router.get("/teachers", auth.isAdmin, (req, res, next) => TeacherController.list(req, res));
router.get("/teachers/count", auth.isAdmin, (req, res, next) => TeacherController.count(req, res));


// STANDARD

router.get("/standards/count", auth.isAdmin, (req, res, next) => StandardController.count(req, res));
router.get("/standards", auth.isAdmin, (req, res, next) => StandardController.list(req, res));

// SECTION

router.get("/sections/count", auth.isAdmin, (req, res, next) => SectionController.count(req, res));
router.get("/sections/", auth.isAdmin, (req, res, next) => SectionController.list(req, res));
router.get("/sections/:id", auth.isAdmin, (req, res, next) => SectionController.get(req, res));


// COURSE

router.get("/coursesection/get/:id", auth.isAdmin, (req, res, next) => CourseController.getCourseSection(req, res));
router.get("/courses/listforuser", auth.isAdmin, (req, res, next) => CourseController.listForUser(req, res));
router.get("/courses", auth.isAdmin, (req, res, next) => CourseController.list(req, res));

//FORUM
router.get("/forums/get/:id", (req, res, next) => ForumController.get(req, res));
router.get("/forums/:id/threads", (req, res, next) => ForumController.listForumThreads(req, res));

router.get("/forums/get/:id", (req, res, next) => ForumController.get(req, res));

//COURSECONTENT
router.put("/coursecontents", jsonParser, (req, res, next) => CourseContentController.add(req, res));
router.get("/coursecontents", (req, res, next) => CourseContentController.list(req, res));
router.get("/coursecontents/:id", (req, res, next) => CourseContentController.get(req, res));

//ATTENDANCE
router.get("/attendance/:sectionId", (req, res, next) => AttendanceController.list(req,res));
router.put("/attendance", jsonParser, (req, res, next) => AttendanceController.add(req,res));

module.exports = router