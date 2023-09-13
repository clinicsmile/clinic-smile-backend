const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const specialties = sequelize.define("specialties", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = {specialties}