const configuration = {};

configuration.SERVER_IP = process.SERVER_IP || "192.168.1.102";
configuration.SERVER_PORT = process.SERVER_PORT || "5000";

configuration.MYSQL_HOST = process.MYSQL_HOST || "localhost";
configuration.MYSQL_PORT = process.MYSQL_PORT || "3306";
configuration.MYSQL_USER = process.MYSQL_USER || "root";
configuration.MYSQL_PASSWORD = process.MYSQL_PASSWORD || "1234";
configuration.MYSQL_DATABASE = process.MYSQL_DATABASE || "clinicsmile";

module.exports = configuration;
