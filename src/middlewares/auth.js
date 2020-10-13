const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const access_token = authHeader && authHeader.split(" ")[1];

    if (access_token === null) res.sendStatus(401);

    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);

        console.log(user);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;