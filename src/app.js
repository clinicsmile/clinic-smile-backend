const configurations = require("./Config/Configurations");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./Database/DatabaseConnection");
const { DefaultRegisters, relations } = require("./Models/index");

//Inicializaciones
const app = express();

//Settings
app.set("port", configurations.SERVER_PORT || 4000);
app.set("host", configurations.SERVER_IP || "localhost");

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(CookieParser("secreto"));

//Rutas
const Router = require("./routes/Router");

app.use(Router);

//Sequilize config
relations();
sequelize.sync({ force: true }).then(async () => {
  await DefaultRegisters();
});

module.exports = app;
