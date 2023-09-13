const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const rol = sequelize.define("rol", {
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

module.exports = {rol}
