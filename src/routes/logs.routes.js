const express = require("express");
const router = express.Router();
const {controller} = require("../Controller/savelogs.helper");

router.get("/logs", controller.getLogs);

module.exports = router;
