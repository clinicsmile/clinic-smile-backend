
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
import express from 'express'
import bodyParser from "body-parser";
import Routes from './routes/index.js';

const port = 3005;

var db = {}
let routes = new Routes(express, db);

let app = express();

app.use(express.json());

const router = express.Router();

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.post("/create", async function (req, res) {
  console.log("req.body", req.body);
});


app.post("/test", async function (req, res) {

  return res.send({ status: "FINISH PROCESS" });

});


app.listen(port, () => {
  console.log(`Backend clinicSmile running on: ${port}`);
});
