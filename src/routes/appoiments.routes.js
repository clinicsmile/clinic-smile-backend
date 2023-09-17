const express = require("express");
const router = express.Router();
const controller = require('../Controller/appoiments.controller');
const middleware = require("../Middlewares/Auth");



module.exports = router;