const { models } = require("../Models/index");
const { saveLogs } = require("./savelogs.helper");
const controller = {};

controller.getBrand = async (req, res) => {
  try {
    let clinic = await models.clinics.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(clinic);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.updateBrand = async (req, res) => {
  try {
    await models.clinics.update(req.body, {
      where: { id: req.params.id },
    });
    saveLogs({
      accion: `Actualización de marca`,
      data: req.body,
    });
    return res.status(200).json({ message: "Clinic updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.updateLogo = async (req, res) => {
  try {
    const response = await models.clinics.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Imagen guardada correctamente" });
    saveLogs({
      accion: `Actualización de logo`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = controller;
