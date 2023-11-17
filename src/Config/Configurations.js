const configuration = {};

configuration.SERVER_IP = process.env.SERVER_IP || "0.0.0.0";
configuration.SERVER_PORT = process.env.PORT || "5000";

configuration.MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
configuration.MYSQL_PORT = process.env.MYSQL_PORT || "3306";
configuration.MYSQL_USER = process.env.MYSQL_USER || "root";
configuration.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "1234";
configuration.MYSQL_DATABASE = process.env.MYSQL_DATABASE || "clinicsmile";
configuration.RESEND_KEY = process.env.RESEND_KEY || "re_ZuRMrBMK_CjvdrmaAfptGyxQsAStyDvYa";
configuration.SENDGRID_KEY = process.env.RESEND_KEY || "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";

module.exports = {configuration};
