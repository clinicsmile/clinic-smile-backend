const express = require("express");
const router = express.Router();
const controller = require('../Controller/auth.controller');
const middleware = require("../Middlewares/Auth");

router.post("/auth", controller.Auth);


module.exports = router;