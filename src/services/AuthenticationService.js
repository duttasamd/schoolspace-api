const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthenticationService {
    async authenticate (username, password) {
        let user = await knex('users').where('username', username)
        .orWhere('email', username)
        .select('password').first();

        if(user == null) {
            throw new Error("NO_USER");
        }
        
        return await bcrypt.compare(password, user.password);
    }

    async login (username, password) {
        let user = await knex('users').where('username', username)
        .orWhere('email', username)
        .select('password', 'username').first();

        if(user == null) {
            throw new Error("NO_USER");
        }

        let authenticated = await bcrypt.compare(password, user.password);

        const refresh_token = jwt.sign({
            name : user.username
        }, process.env.REFRESH_TOKEN_SECRET)

        await knex('users')
        .update('refresh_token', refresh_token)
        .where('username', user.username)

        let tokens = null;

        if(authenticated) {
            tokens = {
                access_token : jwt.sign({
                    username : user.username
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '15m'}),

                refresh_token : refresh_token,
            };

            await knex('users')
            
        } else {
            throw new Error("UNAUTHORIZED");
        }

        return tokens;
    }

    async logout(username) {
        await knex('users')
        .update('refresh_token', null)
        .where('username', username);
    }
}

module.exports = new AuthenticationService();