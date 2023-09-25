const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const users = sequelize.define("Users", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = { users };
