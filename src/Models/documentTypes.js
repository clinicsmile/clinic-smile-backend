const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const documentTypes = sequelize.define("documentTypes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  acronym: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = {documentTypes}
