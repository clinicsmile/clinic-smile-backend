const { models } = require("../Models/index");
const { EmailController } = require("./controller.email");
const { saveLogs } = require("./savelogs.helper");
const controller = {};

controller.getUsers = async (req, res) => {
  try {
    const data = await models.people.findAll(
      req.params.rolId == 0
        ? {}
        : {
            where: { rolId: req.params.rolId },
          }
    );
    const Users = [];
    for (const e of data) {
      let user = await models.users.findOne({
        where: { PersonId: e?.dataValues.id },
      });
      user = { state: user?.dataValues?.state };

      if (e.dataValues.rolId == 2) {
        const doctor = await models.doctors.findOne({
          where: {
            PersonId: e.dataValues.id,
          },
        });
        Users.push({
          ...e.dataValues,
          ...doctor.dataValues,
          ...user,
        });
      } else {
        Users.push({ ...e.dataValues, ...user });
      }
    }

    res.status(200).json(Users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.getUser = async (req, res) => {
  try {
    const user = await models.people.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (user.dataValues.rolId == 2) {
      const doctor = await models.doctors.findOne({
        where: {
          PersonId: req.params.id,
        },
      });
      res.status(200).json({ ...user.dataValues, ...doctor.dataValues });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.registerNewPerson = async (req, res) => {
  try {
    const existingPerson = await models.people.findOne({
      where: { document: req.body.document },
    });
    const existingUser = await models.users.findOne({
      where: { username: req.body.username },
    });

    if (existingPerson) {
      return res
        .status(226)
        .json({ error: "El documento ya se encuentra registrado" });
    }

    if (existingUser) {
      return res
        .status(226)
        .json({ error: "El nombre de usuario no esta disponible" });
    }

    const user = await models.people.create(req.body);
    await models.users.create({
      username: req.body.username,
      password: req.body.password,
      PersonId: user.dataValues.id,
    });

    if (req.body.rolId == 2) {
      await models.doctors.create({
        academicTitle: req.body.academicTitle,
        university: req.body.university,
        profesionalCardNumber: req.body.profesionalCardNumber,
        PersonId: user.dataValues.id,
        specialtyId: req.body.specialtyId,
        academicLevelId: req.body.academicLevelId,
      });
    }

    res.status(200).json({ message: "Usuario Creado Correctamente" });
    saveLogs({
      accion: `Registro de usuario`,
      data: req.body,
    });
    EmailController.CorreoRegistroPersona(req.body);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    saveLogs({
      accion: `Actualizacion de perfil`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.updateUser = async (req, res) => {
  try {
    await models.people.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.rolId == 2) {
      await models.doctors.update(req.body, {
        where: {
          PersonId: req.params.id,
        },
      });
    }
    res.status(200).json({ message: "Usario actualizado con exito!!" });
    saveLogs({
      accion: `Actualizacion de usuario`,
      data: req.body,
    });
  } catch (error) {
    console.log(error.errors);
    if (error.errors[0].message == "document must be unique") {
      res
        .status(226)
        .json({ error: "El documento ya se encuentra registrado" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

controller.deleteUser = async (req, res) => {
  try {
    const response = await models.users.update(
      { state: false },
      {
        where: {
          PersonId: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Usuario Inactivado con exito!!" });
    saveLogs({
      accion: `Inactivacion de usuario`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.reactivateUser = async (req, res) => {
  try {
    await models.users.update(
      { state: true },
      { where: { PersonId: req.params.id } }
    );
    res.status(200).json({ message: "Usuario Reactivado con exito!!" });
    saveLogs({
      accion: `Reactivacion de usuario`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
