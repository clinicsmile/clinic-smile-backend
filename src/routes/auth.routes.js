const express = require("express");
const router = express.Router();
const controller = require('../Controller/auth.controller');
const middleware = require("../Middlewares/Auth");

router.post("/auth",middleware.validateSession, controller.Auth);

router.post("/logOut",controller.LogOut);


module.exports = router;