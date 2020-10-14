const TeacherService = require('../services/TeacherService');

class TeacherController {
    async count (req, res) {
        const count = await TeacherService.count();
        res.json(count);
    }
}

module.exports = new TeacherController();