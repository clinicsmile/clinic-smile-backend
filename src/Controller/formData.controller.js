const controller = {};
const { models } = require("../Models/index");
const { query } = require("./formDataQuery");

controller.gendersList = (req, res) => {
  query(models.genders, res);
};

controller.documentTypeList = (req, res) => {
  query(models.documentTypes, res);
};

controller.bloodTypeList = (req, res) => {
  query(models.bloodTypes, res);
};

controller.academicLevelList = (req, res) => {
  query(models.academicLevels, res);
};

controller.specialtiesList = (req, res) => {
  query(models.specialties, res);
};

controller.rolList = (req, res) => {
  query(models.rol, res);
};

module.exports = controller;