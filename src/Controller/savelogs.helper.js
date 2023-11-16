const { models } = require("../Models/index.js");
const saveLogs = async ({ accion, data }) => {
  try {
    models.Logs.create({
      accion: accion,
      usuario: data.detalle.userChange || "No hay usuario",
      detalle: JSON.stringify(data.detalle),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { saveLogs };
