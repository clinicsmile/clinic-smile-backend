const express = require("express");
const router = express.Router();
const controller = require("../Controller/procedures.controller");
const middleware = require("../Middlewares/Auth");

router.post("/registerProcedure",controller.createProcedure);
router.put("/inactivateProcedure", controller.inactivateProcedure);
router.get("/toListAllRegister", controller.toListAllRegister);
module.exports = router;
