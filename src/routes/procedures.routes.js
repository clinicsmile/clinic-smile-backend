const express = require("express");
const router = express.Router();
const controller = require("../Controller/procedures.controller");
const middleware = require("../Middlewares/Auth");

router.post("/registerProcedure", controller.createProcedure);
router.put(
  "/inactivateProcedure",
  middleware.isAuthenticated,
  controller.inactivateProcedure
);

router.get(
  "/toListAllRegister/:document",
  middleware.isAuthenticated,
  controller.toListAllRegister
);

router.post("/uploadImage", controller.uploadImage);
module.exports = router;
