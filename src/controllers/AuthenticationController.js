const HttpStatus = require('http-status-codes');
const AuthenticationService = require('../services/AuthenticationService')

class AuthenticationController {
    async authenticate (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            let authorized = await auth.authenticate(username, password);
            if(authorized) {
                res.sendStatus(HttpStatus.StatusCodes.OK);
            } else {
                res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED)
            }
        } catch(err) {
            res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED)
        }
    }

    async login (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            let tokens = await AuthenticationService.login(username, password);
            
            if(tokens == null) {
                res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED)
            }
            
            res.json(tokens);
        } catch(err) {
            res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED)
        }
    }

    async logout(req, res) {
        const username = req.user.username;
        await AuthenticationService.logout(username);
        res.sendStatus(200);
    }
}

module.exports = new AuthenticationController();