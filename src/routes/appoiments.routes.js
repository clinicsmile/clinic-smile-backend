const express = require("express");
const router = express.Router();
const controller = require('../Controller/appoiments.controller');
const middleware = require("../Middlewares/Auth");

router.get("/doctors", controller.getDoctors);

router.post("/appoiments", controller.registerAppoiment);

router.get("/appoiments", controller.getAllAppoiments);

router.get("/appoiments/doctor/:id",controller.getAppoimentsDoctor);

router.get("/appoiments/paciente/:document",controller.getAppoimentsPaciente);

router.put("/appoiment/:id",controller.updateAppoiment);

module.exports = router;