const SectionService = require('../services/SectionService');

class SectionController {
    async count (req, res) {
        const count = await SectionService.count();
        res.json(count);
    }
}

module.exports = new SectionController();