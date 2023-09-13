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
    type: DataTypes.STRING,
  },
  media: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

module.exports = {procedures}
