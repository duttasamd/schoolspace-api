const db = require('../utils/knexutil');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthenticationService {
    async authenticate (username, password) {
        let user = await db('users').where('username', username)
        .orWhere('email', username)
        .select('password').first();

        if(user == null) {
            throw new Error("UNAUTHORIZED");
        }
        
        return await bcrypt.compare(password, user.password);
    }

    async login (username, password) {
        
        let user = await db('users').where('username', username)
        .orWhere('email', username)
        .select('password', 'username', 'role_id', 'id').first();

        if(user === null) {
            throw new Error("UNAUTHORIZED");
        }

        let authenticated = await bcrypt.compare(password, user.password);

        let tokens = null;

        if(authenticated) {
            const refresh_token = jwt.sign({
                name : user.username
            }, process.env.REFRESH_TOKEN_SECRET)
    
            await db('users')
            .update('refresh_token', refresh_token)
            .where('username', user.username);

            tokens = {
                access_token : jwt.sign({
                    username : user.username,
                    user_id : user.id,
                    role_id :  user.role_id
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '15m'}),

                refresh_token : refresh_token,
            };
            
        } else {
            throw new Error("UNAUTHORIZED");
        }

        return tokens;
    }

    async logout(username) {
        await db('users')
        .update('refresh_token', null)
        .where('username', username);
    }
}

module.exports = new AuthenticationService();