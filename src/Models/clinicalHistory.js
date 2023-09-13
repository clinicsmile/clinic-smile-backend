const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const clinicalHistory = sequelize.define("clinicalHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});
module.exports = {clinicalHistory}