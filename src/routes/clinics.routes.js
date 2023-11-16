const express = require("express");
const router = express.Router();
const controller = require('../Controller/clinic.controller');

router.get("/getBrand/:id", controller.getBrand);

router.put("/updateBrand/:id", controller.updateBrand);

module.exports = router;