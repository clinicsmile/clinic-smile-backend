const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const sessions = sequelize.define("sessions", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = {sessions}
