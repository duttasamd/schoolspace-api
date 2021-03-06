const db = require('../utils/knexutil');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

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
                username : user.username
            }, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '12h'})
    
            await db('users')
            .update('refresh_token', refresh_token)
            .where('username', user.username);

            tokens = {
                access_token : jwt.sign({
                    username : user.username,
                    user_id : user.id,
                    role_id :  user.role_id
                }, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'}),

                refresh_token : refresh_token,
                expires_at : new moment.utc().add(60*60, 'seconds')
            };
            
        } else {
            throw new Error("UNAUTHORIZED");
        }

        return tokens;
    }

    async refreshAccessToken(refresh_token) {
        console.log(`refresh token : ${refresh_token}`);

        const token = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

        if(!token)
            throw new Error("UNAUTHORIZED");

        let user = await db('users')
            .where('username', token.username)
            .orWhere('email', token.username)
            .andWhere('refresh_token', refresh_token)
            .select('username', 'role_id', 'id').first();

        if(user === null) {
            throw new Error("UNAUTHORIZED");
        }

        const new_refresh_token = jwt.sign({
            username : user.username
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '12h'})

        await db('users')
        .update('refresh_token', new_refresh_token)
        .where('username', user.username);

        const tokens = {
            access_token : jwt.sign({
                username : user.username,
                user_id : user.id,
                role_id :  user.role_id
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1h'}),

            refresh_token : new_refresh_token,
            expires_at : new moment.utc().add(60*60, 'seconds')
        };

        return tokens;
    }

    async logout(username) {
        await db('users')
        .update('refresh_token', null)
        .where('username', username);
    }
}

module.exports = new AuthenticationService();