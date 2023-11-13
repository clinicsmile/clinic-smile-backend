const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const doctors = sequelize.define("doctors", {
  doctorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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

module.exports = { doctors };
