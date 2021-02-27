const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(" ")[1];

    if (access_token === null) {
        res.status(401);
        throw new Error("Access token required.");
    }

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403);
            throw new Error("UNAUTHORIZED");
        }

        req.user = user;
        next();
    });
}

function isAdmin(req, res, next) {
    const user = req.user;

    if(!user || req.user.role_id !== 1){
        throw new Error("UNAUTHORIZED");
    }

    next();
}

module.exports = { authenticateToken : authenticateToken, isAdmin : isAdmin};