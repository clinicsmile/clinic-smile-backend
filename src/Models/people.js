const { sequelize } = require("../Database/DatabaseConnection");
const { DataTypes } = require("sequelize");

const people = sequelize.define("People", {
  document: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull:true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:true
  },
  cellPhone: {
    type: DataTypes.STRING,
    allowNull:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull:true
  },
  address: {
    type: DataTypes.STRING,
    allowNull:true
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull:true
  },
  allergies:{
    type:DataTypes.STRING,
    allowNull:true
  },
  diseases:{
    type:DataTypes.STRING,
    allowNull:true
  }
},{
  tableName:"people"
});

module.exports = {people}