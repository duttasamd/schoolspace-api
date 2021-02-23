const AuthenticationService = require('../services/AuthenticationService')

class AuthenticationController {
    async authenticate (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password) {
            res.status(403);
            throw new Error("UNAUTHORIZED");
        }

        let authorized = await AuthenticationService.authenticate(username, password);
        if(authorized) {
            res.status(200);
            return;
        } else {
            res.status(403);
            throw new Error("UNAUTHORIZED");
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
        
        if(username)
            await AuthenticationService.logout(username);
        
        res.status(200);
        return;
    }
}

module.exports = new AuthenticationController();