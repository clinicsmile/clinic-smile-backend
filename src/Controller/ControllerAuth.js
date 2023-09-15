const controller = {};
const jwt = require("jsonwebtoken");
const { users } = require("../Models/users");
const { people } = require("../Models/people");
const { genders } = require("../Models/genders");
const { documentTypes } = require("../Models/documentTypes");
const { bloodTypes } = require("../Models/bloodTypes");

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
    let user = await users.findOne({
      include: [{ model: people, required: true }],
      where: {
        username: auth[0],
        password: auth[1],
      },
    });
    console.log(user);
    if (user != null) {
      jwt.sign({ user: user }, "secretkey", (error, token) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ ok: true, token: token, username: auth[0] });
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

controller.getUsers = async (req, res) => {
  try {
    people.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
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

controller.registerNewPerson = async (req, res) => {
  try {
    console.log(req.body);
    await people.create(req.body);
    await users.create({
      username: req.body.username,
      password: req.body.password,
      PersonDocument: req.body.document,
    });

    res.status(204).json({ message: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error Server" });
  }
};

controller.gendersList = async (req, res) => {
  try {
    await genders.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Error Server" });
  }
};

controller.documentTypeList = async (req, res) => {
  try {
    await documentTypes.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Error Server" });
  }
};

controller.bloodTypeList = async (req, res) => {
  try {
    await bloodTypes.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Error Server" });
  }
};
module.exports = controller;
