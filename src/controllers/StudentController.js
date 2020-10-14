const StudentService = require('../services/StudentService');

class StudentController {
    async count (req, res) {
        const count = await StudentService.count();
        res.json(count);
    }
}

module.exports = new StudentController();