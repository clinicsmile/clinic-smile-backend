const jwt = require("jsonwebtoken");
const { models } = require("../Models/index");
const Middleware = {};

Middleware.isAuthenticated = async (req, res, next) => {
  let token = req.headers["Autorization"];
  if (token != undefined) {
    token = token.replace("token=", "");
    jwt.verify(token, "secretkey", (error, user) => {
      if (error) {
        console.log(error);
        res.status(403).json({ ok: false, message: "403 Forbidden" });
      } else {
        console.log(user);
        next();
      }
    });
  } else {
    res.status(401).json({ ok: false, message: "401 Unauthorized" });
  }
};

Middleware.validateSession = async (req, res, next) => {
  const authheader = req.body.authorization;
  if (!authheader) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }
  const auth = new Buffer.from(authheader.replace("Basic ", ""), "base64")
    .toString()
    .split(":");
  try {
    let user = await models.users.findOne({
      include: [models.people],
      where: {
        username: auth[0],
        password: auth[1],
      },
    });
    if (user != null) {
      if (req.body.newSession) {
        next();
      } else {
        let session = await models.sessions.findOne({
          where: {
            UserUsername: auth[1],
            state: 1,
          },
        });
        if (session != null) {
          res.status(409).json({ message: "Ya tiene una session activa" });
        } else {
          next();
        }
      }
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = Middleware;
