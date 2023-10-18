const express = require("express");
const router = express.Router();
const controller = require("../Controller/users.controller");
const middleware = require("../Middlewares/Auth");

router.get("/users", middleware.isAuthenticated, controller.getUsers);

router.get("/user/:document", middleware.isAuthenticated,controller.getUser);

router.post("/register", controller.registerNewPerson);

router.put("/profile/:document", middleware.isAuthenticated,controller.UpdateProfile);

router.delete("/user/:document", middleware.isAuthenticated,controller.deleteUser);

router.put("/user/:document",middleware.isAuthenticated, controller.updateUser);

module.exports = router;
