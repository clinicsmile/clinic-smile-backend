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
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = { users };
