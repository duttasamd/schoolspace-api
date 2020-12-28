const StandardService = require('../services/StandardService');

class StandardController {
    async count (req, res) {
        const count = await StandardService.count();
        res.json(count);
    }

    async list(req, res) {
        const search = req.query.standard_id || "";
        const result = await StandardService.list(search);
        res.json(result);
    }
}

module.exports = new StandardController();