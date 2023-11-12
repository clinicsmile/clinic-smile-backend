const express = require("express");
const router = express.Router();
const controller = require('../Controller/formData.controller');

router.get("/gendersList",controller.gendersList);

router.get("/documentTypeList",controller.documentTypeList);

router.get("/bloodTypeList",controller.bloodTypeList);

router.get("/academicLevelList",controller.academicLevelList);

router.get("/specialtiesList",controller.specialtiesList);

router.get("/rolList",controller.rolList);

module.exports = router;