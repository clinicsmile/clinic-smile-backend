const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const appointments = sequelize.define("appointments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  time: {
    type: DataTypes.TIME,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});
module.exports = {appointments}