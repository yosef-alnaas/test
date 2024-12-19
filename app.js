const express = require("express");
const cors = require("cors");
const UserRoute = require("./router/user.router");
const keysroute = require("./router/keys.router");

const app = express();

// Enable CORS for all requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Register your routes after middleware
app.use("/", UserRoute);
app.use("/", keysroute);

module.exports = app;
