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

    async list (req, res) {
        const section_id = req.query.section_id || -1;

        if(section_id > 0) {
            const courses = await CourseService.list(section_id);
            res.json(courses);
        } else {
            res.sendStatus(403);
        }
        
    }
}

module.exports = new CourseController();