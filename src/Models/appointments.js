const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const appointments = sequelize.define("appointments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  reason:{
    type:DataTypes.STRING,
  },    
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.TIME,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue:"En espera"
  },  
});
module.exports = {appointments}