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

        let tokens = await AuthenticationService.login(username, password)
            .catch((error) => {
                if(error.message === "UNAUTHORIZED")
                    res.status(403);
                else
                    res.status(500);
                    
                throw error;
            });
        
        if(tokens == null) {
            res.status(403);
            throw new Error("Tokens could not be generated.");
        }
        
        res.json(tokens);
    }

    async logout(req, res) {
        const username = req.user.username;
        await AuthenticationService.logout(username);
        res.sendStatus(200);
    }
}

module.exports = new AuthenticationController();