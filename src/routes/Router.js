const express = require("express");
const router = express.Router();
const appoiments = require("./appoiments.routes");
const users = require("./users.routes.js");
const formData = require("./formData.routes.js");
const auth = require("./auth.routes.js");
const clinics = require("./clinics.routes.js");

router.use(appoiments);
router.use(users);
router.use(formData);
router.use(auth);
router.use(clinics);


module.exports = router;
