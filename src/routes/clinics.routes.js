const express = require("express");
const router = express.Router();
const controller = require("../Controller/clinic.controller");

router.get("/getBrand/:id", controller.getBrand);

router.put("/updateBrand/:id", controller.updateBrand);

router.put("/updateLogo/:id", controller.updateLogo);

module.exports = router;
