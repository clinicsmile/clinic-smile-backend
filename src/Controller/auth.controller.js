const jwt = require("jsonwebtoken");
const { models } = require("../Models/index");
const crypto = require("crypto");

const controller = {};

controller.Auth = async (req, res) => {
  const authheader = req.body.authorization;
  if (!authheader) {
    res.status(400).json({ error: "Bad Request" });
    return;
  }

  const auth = new Buffer.from(authheader.replace("Basic ", ""), "base64")
    .toString()
    .split(":");
  try {
    // Genera una clave secreta aleatoria
    const secretKey = crypto.randomBytes(32).toString("hex");

    let user = await models.users.findOne({
      include: [models.people],
      where: {
        username: auth[0],
        password: auth[1],
        state: true,
      },
    });
    if (user != null) {
      jwt.sign({ user: secretKey }, secretKey, async (error, token) => {
        if (error) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          if (user.dataValues.Person.rolId == 2) {
            const doctor = await models.doctors.findOne({
              where: {
                PersonId: user.dataValues.Person.id,
              },
            });
            res.status(200).json({
              ok: true,
              token: token,
              user: { ...user.dataValues, ...doctor.dataValues },
            });
          } else {
            res.status(200).json({ ok: true, token: token, user });
          }
          models.sessions.create({
            token: token,
            state: 1,
            UserUsername: auth[0],
          });
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

controller.LogOut = async (req, res) => {
  try {
    await models.sessions.update(
      { state: 0 },
      {
        where: {
          userUsername: req.body.username,
          state: 1,
        },
      }
    );
    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.VerifySession = async (req, res) => {
  let token = req.headers.authorization;
  token = token.replace("Bearer token=", "");
  jwt.verify(token, "secretkey", (error, user) => {
    if (error) {
      console.log(error);
      res.status(403).json({ ok: false, message: "403 Forbidden" });
    } else {
      res.status(100).json({ ok: true, message: "Valid Token" });
    }
  });
};

module.exports = controller;
