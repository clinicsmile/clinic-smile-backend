const controller = {};
//const MySqlConnection = require("../Config/ConnectionMysql");
const MysqlQuerys = require("../Models/MysqlQuerys");
const jwt = require("jsonwebtoken");

controller.Auth = async (req, res) => {
  const authheader = req.headers.authorization;
  if (!authheader) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const auth = new Buffer.from(authheader.replace("Basic ", ""), "base64")
    .toString()
    .split(":");

  let Connection = await MySqlConnection.GetConnection();
  let user = await MysqlQuerys.ValidateLogin(auth[0], auth[1], Connection);
  Connection.release();

  if (user > 0) {
    jwt.sign({ user: user }, "secretkey", (error, token) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ ok: true, token: token,username:auth[0]});
      }
    });
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
};

controller.getUsers = async (req, res) => {
  let Connection = await MySqlConnection.GetConnection();
  let users = await MysqlQuerys.GetUsers(Connection);
  res.status(200).json({ users });
  Connection.release();
};

controller.VerifySession = async (req, res) => {
  let token = req.headers.authorization;
  token = token.replace("Bearer token=", "");
  console.log(token);
    jwt.verify(token, "secretkey", (error, user) => {
      if (error) {
        console.log(error);
        res.status(403).json({ ok: false, message: "403 Forbidden" });
      } else {
        console.log(user);
        res.status(100).json({ ok: true, message: "Valid Token" });
      }
    });
};
module.exports = controller;
