const UserService = require('../services/UserService');

class UserController {
    async get (req, res) {
        const user = await UserService.get(req.user.username);
        res.json(user);
    }

    async list(req, res) {
        const pageIndex = req.query.pageIndex || 0;
        const pageSize = req.query.pageSize || 10;
        const search = req.query.search || "";

        const result = await UserService.list(pageIndex, pageSize, search);

        res.json(result);
    }

    async count (req, res) {
        const count = await UserService.count();
        res.json(count);
    }
}

module.exports = new UserController();