const jwt = require("jsonwebtoken");
const { models } = require("../Models/index");
const controller = {};

controller.Auth = async (req, res) => {
  const authheader = req.headers.authorization;
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
      jwt.sign({ user: user }, "secretkey", (error, token) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ ok: true, token: token, user });
        }
      });
    } else {
      res.status(401).send({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
