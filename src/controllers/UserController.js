const HttpStatus = require('http-status-codes');

class UserController {
    get (req, res, next) {
        console.log("User : ", req.user);
        res.json(req.user.username);
    }
}

module.exports = new UserController();