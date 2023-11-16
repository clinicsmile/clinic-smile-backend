const { models } = require("../Models/index");
const controller = {};

controller.getBrand = async (req, res) => {
  try {
    // let clinic = await models.clinics.findOne({
    //   where: {
    //     id: req.body.location,
    //   },
    // });

    // if (!clinic) {
    //   clinic = {
    //     name: "Clinic Smile",
    //     primaryColor: "#673ab7",
    //     secundaryColor: "#9c27b0",
    //     logo: "https://clinic-smile.netlify.app/logo.svg",
    //   }
    // }
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
    return res.status(200).json({ message: "Clinic updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
