const SectionService = require('../services/SectionService');

class SectionController {
    async count (req, res) {
        const count = await SectionService.count();
        res.json(count);
    }

    async list (req, res) {
        const standard_id = req.query.standard_id || null;
        if(standard_id === null) {
            res.sendStatus(403);
        } else {
            const sections = await SectionService.list(standard_id);
            res.json(sections);
        }
    }
}

module.exports = new SectionController();