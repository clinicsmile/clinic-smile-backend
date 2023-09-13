const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");
const {rol} = require("./rol");

const people = sequelize.define("people", {
  document: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  cellPhone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
  },
});
module.exports = {people}