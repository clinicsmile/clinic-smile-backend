const {Sequelize} = require('sequelize');
const configuration = require('../Config/Configurations');

const sequelize = new Sequelize(configuration.MYSQL_DATABASE, configuration.MYSQL_USER, configuration.MYSQL_PASSWORD, {
  host: configuration.MYSQL_HOST,
  dialect: 'mysql'
});

module.exports={sequelize}