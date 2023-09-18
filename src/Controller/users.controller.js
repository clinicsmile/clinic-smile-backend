const { models } = require("../Models/index");
const controller = {};

controller.getUsers = async (req, res) => {
  try {
    models.people
      .findAll()
      .then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.getUser = async (req, res) => {
  try {
    models.people
      .findOne({
        where: {
          document: req.params.document,
        },
      })
      .then((user) => res.status(200).json(user));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.registerNewPerson = async (req, res) => {
  try {
    await models.people.create(req.body);
    await models.users.create({
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

controller.UpdateProfile = async (req, res) => {
  try {
    await models.people.update(req.body, {
      where: {
        document: req.params.document,
      },
    });
    res.status(200).json({ message: "Usario actualizado con exito!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.deleteUser = async (req, res) => {
  try {
    await models.people.destroy({
      where: {
        document: req.params.document,
      },
    });
    res.status(200).json({ message: "Usuario Eliminado con exito!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
