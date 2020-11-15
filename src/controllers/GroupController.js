const GroupService = require('../services/GroupService');

class GroupController {
    async count (req, res) {
        const count = await GroupService.count();
        res.json(count);
    }

    async list (req, res) {
        const searchterm = req.query.searchterm;
        const groups = await GroupService.list(searchterm);
        res.json(groups);
    }
}

module.exports = new GroupController();