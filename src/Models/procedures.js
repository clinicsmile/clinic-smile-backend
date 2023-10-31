const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const procedures = sequelize.define("procedures", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  detail: {
    type: DataTypes.TEXT,
  },
  media: {
    type: DataTypes.TEXT("long"),
  },
});

module.exports = {procedures}
