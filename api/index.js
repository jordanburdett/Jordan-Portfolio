require("dotenv").config();
console.log(process.env.MONGODB_URI)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const localPort = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoCardRouter = require('./routes/infoCard');
var projectsRouter = require('./routes/projects');
var aboutRouter = require('./routes/about');

app.use("/api", indexRouter);
app.use("/api/infocard", infoCardRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/about", aboutRouter);

if (process.env.ENVIRONMENT !== "cloud") {
    app.listen(localPort, () => {
        console.log(`Server running on port ${localPort}`);
    });
}

module.exports = app;
