const express = require("express");
const router = express.Router();
const controller = require('../Controller/ControllerAuth');

router.post("/Auth", controller.Auth);

module.exports = router;