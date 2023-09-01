const configurations = require("./Config/Configurations");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");
const cors = require('cors');


//Inicializaciones
const app = express();

//Settings
app.set("port", configurations.SERVER_PORT || 4000);
app.set("host", configurations.SERVER_IP || "localhost");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//static files
app.use(express.static(path.join(__dirname, "./public")));


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(CookieParser("secreto"));


//Rutas
const routes = require("./routes/Router");

app.use(routes);

module.exports=app;