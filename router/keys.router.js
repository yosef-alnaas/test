const routerk = require ("express").Router();
const keysController = require("../controller/keys.controller");

routerk.post('/sendKey',keysController.SendKey);

module.exports=routerk;