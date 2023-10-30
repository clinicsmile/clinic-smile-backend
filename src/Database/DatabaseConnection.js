const { Sequelize } = require("sequelize");
const configuration = require("../Config/Configurations");

const sequelize = new Sequelize(
  configuration.MYSQL_DATABASE,
  configuration.MYSQL_USER,
  configuration.MYSQL_PASSWORD,
  {
    host: configuration.MYSQL_HOST,
    port: configuration.MYSQL_PORT,
    dialect:"mysql",
    logging: true,
  }
);

module.exports = { sequelize };
