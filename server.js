const express = require("express");
const routes = require('./src/routes')
var cors = require('cors')
const auth = require('./src/middlewares/auth')
const AuthenticationController = require('./src/controllers/AuthenticationController');

const bodyParser = require('body-parser')


const app = express();

app.use(cors())
app.get("/", (req, res) => res.send("API service is online..."));

app.get('/api/v1/refreshtoken', (req, res, next) =>
    AuthenticationController.refreshAccessToken(req, res).catch(next)
);

var jsonParser = bodyParser.json()
app.post('/api/v1/login', jsonParser, (req, res, next) =>
    AuthenticationController.login(req, res).catch(next)
);

app.use(auth.authenticateToken);
app.use('/api/v1', routes);

app.use((error, req, res, next) => {
    return res.json({
        message: error.toString()
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));