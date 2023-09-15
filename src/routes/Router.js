const express = require("express");
const router = express.Router();
const controller = require('../Controller/ControllerAuth');
const middleware = require("../Middlewares/Auth");

router.get("/Auth", controller.Auth);

router.get("/Users",controller.getUsers);

router.post("/", (req,res)=>console.log(req.body));

router.post("/Register",controller.registerNewPerson);

router.get("/gendersList",controller.gendersList);

router.get("/documentTypeList",controller.documentTypeList);

router.get("/bloodTypeList",controller.bloodTypeList)
module.exports = router;