const StudentService = require('../services/StudentService');

class StudentController {
    async count (req, res) {
        const count = await StudentService.count();
        res.json(count);
    }

    async list(req, res) {
        const pageIndex = req.query.pageIndex || 0;
        const pageSize = req.query.pageSize || 10;
        const search = req.query.search || "";
        const sectionId = req.query.sectionId;

        const result = await StudentService.list(pageIndex, pageSize, search, sectionId);

        res.json(result);
    }
}

module.exports = new StudentController();