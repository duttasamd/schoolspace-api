const StandardService = require('../services/StandardService');

class StandardController {
    async count (req, res) {
        const count = await StandardService.count();
        res.json(count);
    }
}

module.exports = new StandardController();