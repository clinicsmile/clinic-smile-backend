const express = require("express");
const router = express.Router();
const controller = require("../Controller/appoiments.controller");
const middleware = require("../Middlewares/Auth");

router.get("/doctors", controller.getDoctors);

router.get("/patients",  controller.getPatients);

router.post(
  "/appoiments",
  middleware.isAuthenticated,
  controller.registerAppoiment
);

router.get(
  "/appoiments",
  middleware.isAuthenticated,
  controller.getAllAppoiments
);

router.get(
  "/appoimentsPending",
  middleware.isAuthenticated,
  controller.getAppoimentsPending
);

router.get(
  "/appoiments/doctor/:id",
  middleware.isAuthenticated,
  controller.getAppoimentsDoctor
);

router.get(
  "/appoiments/paciente/:id",
  middleware.isAuthenticated,
  controller.getAppoimentsPaciente
);

router.put(
  "/appoiment/:id",
  middleware.isAuthenticated,
  controller.updateAppoiment
);

router.put(
  "/cancelAppoiment/:id",
  middleware.isAuthenticated,
  controller.cancelAppoiment
);

router.post("/appointments/create-no-auth", controller.createAppoimentNoAuth);

module.exports = router;
