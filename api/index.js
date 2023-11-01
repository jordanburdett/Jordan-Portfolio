const app = require("express")();
const bodyParser = require('body-parser');
const localPort = 3000;

app.use(express.json());
app.user(bodyParser.json());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoCardRouter = require('./routes/infoCard');

app.use("/api", indexRouter);
app.use("/api/infocard", infoCardRouter);
app.use("/api/users", usersRouter);

module.exports = app;
