const express = require("express");
const router = express.Router();
const controller = require('../Controller/appoiments.controller');
const middleware = require("../Middlewares/Auth");

router.get("/doctors", controller.getDoctors);

router.post("/appoiments", controller.registerAppoiment);


module.exports = router;