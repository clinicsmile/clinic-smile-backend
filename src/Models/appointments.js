const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const appointments = sequelize.define("appointments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  reason: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "En espera",
  },
});
module.exports = { appointments };
