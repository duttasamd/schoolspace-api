const express = require("express");
const routes = require('./src/routes')
var cors = require('cors')

const app = express();

app.use(cors())

app.use('/api/v1', routes);

app.get("/", (req, res) => res.send("API service is online..."));

app.use((error, req, res, next) => {
    return res.json({ error: error.toString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));