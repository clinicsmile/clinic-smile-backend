const { models } = require("../Models/index.js");
const controller = {};
const saveLogs = async ({ accion, data }) => {
  try {
    console.log(data);
    models.Logs.create({
      accion: accion,
      usuario: data.userChange || "No hay usuario",
      detalle: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

controller.getLogs = async (req, res) => {
  try {
    const data = await models.Logs.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { saveLogs, controller };
