const UserService = require('../services/UserService');

class UserController {
    async get (req, res) {
        if(req.user === null) {
            res.sendStatus(403);
        }
        
        let user;
        if(req.params && req.params.username) {
            user = await UserService.get(req.params.username);
        } else if(req.user && req.user.username) {
            user = await UserService.get(req.user.username);
        } else {
            res.end();
        }
        
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

    async staffCount (req, res) {
        const count = await UserService.staffCount();
        res.json(count);
    }
}

module.exports = new UserController();