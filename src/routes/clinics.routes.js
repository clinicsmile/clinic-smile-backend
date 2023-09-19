const express = require("express");
const router = express.Router();
const controller = require('../Controller/clinic.controller');

router.post("/getBrand", controller.getBrand);

module.exports = router;