const TeacherService = require('../services/TeacherService');

class TeacherController {
    async count (req, res) {
        const count = await TeacherService.count();
        res.json(count);
    }

    async list(req, res) {
        const pageIndex = req.query.pageIndex || 0;
        const pageSize = req.query.pageSize || 10;
        const search = req.query.search || "";

        const result = await TeacherService.list(pageIndex, pageSize, search);

        res.json(result);
    }
}

module.exports = new TeacherController();