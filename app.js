const express = require("express");
const cors= require("cors");

const bodyParser = require("body-parser");
const UserRoute = require("./router/user.router");
const app = express();

//wlierhf
app.use(bodyParser.json());
app.use("/",UserRoute);

app.use(express.json());
app.use(cors());

module.exports = app;