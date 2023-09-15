const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const bloodTypes = sequelize.define("bloodTypes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  acronym: {
    type: DataTypes.STRING,
  },
});
module.exports = { bloodTypes };
