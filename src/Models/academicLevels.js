const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const academicLevels = sequelize.define("academicLevels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description:{
    type: DataTypes.STRING,
  }
});

module.exports = {academicLevels}
