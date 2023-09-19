const express = require("express");
const router = express.Router();
const controller = require('../Controller/clinic.controller');

router.post("/getBrand", controller.Auth);

module.exports = router;