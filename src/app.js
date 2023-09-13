
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
import config from "./config/config.js";
import express from "express";
import bodyParser from "body-parser";
import Models from "./models/index.js";
import Routes from "./routes/index.js";
import v8 from "v8";
import helmet from "helmet";

const clog = (st, text) => console.log(st, text);

let db = new Models(express);
let routes = new Routes(express, db);

const app = express();
let server;

const runningServer = function () {
  clog("\x1b[36m%s\x1b[0m", `Listening in ${config.domain}:${config.port}`);
};

const runServer = () => {
  const router = express.Router();

  clog("\x1b[37m", "Putting headers");

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, refacil-version"
    );
    next();
  });

  clog("\x1b[37m", "Creating Controllers");

  // router.use("/auth", routes.Auth);
  router.use("/clinics", routes.Clinics);

  app.use("/api/v1", router);

  app.use((err, req, res, next) => {
    console.error("GENERAL ERR", err);
    res.status(500).json({ message: "Something went wrong" });
  });

  let total = v8.getHeapStatistics().total_available_size;
  let gb = (total / 1024 / 1024 / 1024).toFixed(2);
  clog("\x1b[33m", `Memory Limit: ${gb} GB`);
};

let timeout = 3 * 60 * 1000;

runServer();
server = app.listen(config.port, runningServer);

server.setTimeout(timeout);
server.timeout = timeout;
