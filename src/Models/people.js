const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const people = sequelize.define("People", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  allergies: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diseases: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { people };
