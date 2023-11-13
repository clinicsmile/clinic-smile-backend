const express = require("express");
const router = express.Router();
const controller = require("../Controller/users.controller");
const middleware = require("../Middlewares/Auth");

router.get("/users/:rolId", middleware.isAuthenticated, controller.getUsers);

router.get("/user/:id", middleware.isAuthenticated,controller.getUser);

router.post("/register", controller.registerNewPerson);

router.put("/profile/:document", middleware.isAuthenticated,controller.UpdateProfile);

router.delete("/user/:id", middleware.isAuthenticated,controller.deleteUser);

router.put("/user/:id",middleware.isAuthenticated, controller.updateUser);

router.put("/reactivateUser/:document",middleware.isAuthenticated, controller.reactivateUser);

module.exports = router;
