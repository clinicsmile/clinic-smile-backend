const express = require("express");
const router = express.Router();
const controller = require('../Controller/ControllerAuth');
const middleware = require("../Middlewares/Auth");

router.get("/Auth", controller.Auth);

router.get("/Users",middleware.isAuthenticated,controller.getUsers);

router.get("/Verify", controller.VerifySession);

module.exports = router;