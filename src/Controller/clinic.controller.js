const { models } = require("../Models/index");
const controller = {};

controller.getBrand = async (req, res) => {
  try {
    let clinic = await models.clinics.findOne({
      where: {
        domain: req.body.location,
      },
    });

    if (!clinic) {
      clinic = {
        name: "Clinic Smile",
        primaryColor: "#673ab7",
        secundaryColor: "#9c27b0",
        logo: "https://clinic-smile.netlify.app/logo.svg",
      }
    }
    return res.status(200).json(clinic);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
