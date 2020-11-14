const CourseService = require('../services/CourseService');

class CourseController {
    async listForUser (req, res) {
        const courses = await CourseService.listForUser(req.user);
        res.json(courses);
    }

    async getCourseSection(req, res) {
        const coursesection = await CourseService.getCourseSection(req.params.id);
        res.json(coursesection);
    }
}

module.exports = new CourseController();