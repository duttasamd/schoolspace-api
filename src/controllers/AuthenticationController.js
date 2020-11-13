const AuthenticationService = require('../services/AuthenticationService')

class AuthenticationController {
    async authenticate (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        try {
            let authorized = await AuthenticationService.authenticate(username, password);
            if(authorized) {
                res.sendStatus(200);
            } else {
                res.sendStatus(403)
            }
        } catch(err) {
            res.sendStatus(403)
        }
    }

    async login (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        
        try {
            let tokens = await AuthenticationService.login(username, password);
            
            if(tokens == null) {
                res.sendStatus(403)
            }
            
            res.json(tokens);
        } catch(err) {
            res.sendStatus(403)
        }
    }

    async logout(req, res) {
        const username = req.user.username;
        await AuthenticationService.logout(username);
        res.sendStatus(200);
    }
}

module.exports = new AuthenticationController();