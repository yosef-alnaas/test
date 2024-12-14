const express = require("express");
const bodyParser = require("body-parser")
const UserRoute = require("./router/user.router");
const app = express();

app.use(bodyParser.json())

app.use("/",UserRoute);

module.exports = app;