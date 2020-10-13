const express = require("express");
const routes = require('./src/routes')

const app = express();

app.use('/api/v1', routes);

app.get("/", (req, res) => res.send("API service is online..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));