const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const clinics = sequelize.define("clinics", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  primaryColor: {
    type: DataTypes.STRING,
  },
  secundaryColor: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.TEXT("long"),
  },
  domain: {
    type: DataTypes.STRING,
  },
});

module.exports = {clinics}
