require("dotenv").config();
console.log(process.env.MONGODB_URI)
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const localPort = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Import routes
var indexRouter = require('./routes/index');
var infoCardRouter = require('./routes/infoCard');
var projectsRouter = require('./routes/projects');
var aboutRouter = require('./routes/about');
var statisticsRouter = require('./routes/statistics');
var usersRouter = require('./routes/users');

app.use("/api", indexRouter);
app.use("/api/infocard", infoCardRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/about", aboutRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/users", usersRouter);

// Only start the server if we're not in a test environment
if (process.env.NODE_ENV !== 'test' && process.env.ENVIRONMENT !== "cloud") {
    app.listen(localPort, () => {
        console.log(`Server running on port ${localPort}`);
    });
}

module.exports = app;
