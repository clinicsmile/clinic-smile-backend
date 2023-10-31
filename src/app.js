const configurations = require("./Config/Configurations");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./Database/DatabaseConnection");
const { DefaultRegisters, relations } = require("./Models/index");
const multer = require('multer');

//Inicializaciones
const app = express();

//Settings
app.set("port", configurations.SERVER_PORT || 4000);
app.set("host", configurations.SERVER_IP || "localhost");

//middlewares
app.use(morgan("combined"));
app.use(compression());
app.use(express.json({limit:"10MB"}));
app.use(cors());
app.use(CookieParser("secreto"));
app.use(multer());

//Rutas
const Router = require("./routes/Router");

app.use(Router);

//Sequilize config
relations();
sequelize.sync({ force: false }).then(async () => {
  //await DefaultRegisters();
});

module.exports = app;
