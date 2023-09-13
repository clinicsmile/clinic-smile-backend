const configurations = require("./Config/Configurations");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const CookieParser = require("cookie-parser");
const cors = require('cors');
const {sequelize} = require("./Database/DatabaseConnection");
require('./Models/asociations');


//Inicializaciones
const app = express();

//Settings
app.set("port", configurations.SERVER_PORT || 4000);
app.set("host", configurations.SERVER_IP || "localhost");

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

app.use(CookieParser("secreto"));

//Rutas
const routes = require("./routes/Router");

app.use(routes);
sequelize.sync({force:true});
module.exports=app;