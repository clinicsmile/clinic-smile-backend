const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const genders = sequelize.define("genders", {
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
module.exports = {genders}
