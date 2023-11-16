const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");
const Logs = sequelize.define("Logs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  detalle: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

module.exports = { Logs };
