const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const doctors = sequelize.define("doctors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  academicLevel: {
    type: DataTypes.STRING,
  },
  academicTitle: {
    type: DataTypes.STRING,
  },
  university: {
    type: DataTypes.STRING,
  },
  profesionalCardNumber: {
    type: DataTypes.STRING,
  },
});

module.exports = {doctors}