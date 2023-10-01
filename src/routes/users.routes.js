const express = require("express");
const router = express.Router();
const controller = require("../Controller/users.controller");
const middleware = require("../Middlewares/Auth");

router.get("/users", controller.getUsers);

router.get("/user/:document", controller.getUser);

router.post("/register", controller.registerNewPerson);

router.put("/profile/:document", controller.UpdateProfile);

router.delete("/user/:document", controller.deleteUser);

router.put("/user/:document", controller.updateUser);

module.exports = router;
