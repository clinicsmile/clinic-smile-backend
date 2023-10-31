const { models } = require("../Models/index");
const controller = {};

controller.getUsers = async (req, res) => {
  try {
    const data = await models.people.findAll();
    const Users = [];
    for (const e of data) {
      if (e.dataValues.rolId == 2) {
        const doctor = await models.doctors.findOne({
          where: {
            PersonDocument: e.dataValues.document,
          },
        });
        Users.push({ ...e.dataValues, ...doctor.dataValues });
      } else {
        Users.push({ ...e.dataValues });
      }
    }
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.getUser = async (req, res) => {
  try {
    const user = await models.people.findOne({
      where: {
        document: req.params.document,
      },
    });
    if (user.dataValues.rolId == 2) {
      const doctor = await models.doctors.findOne({
        where: {
          PersonDocument: req.params.document,
        },
      });
      res.status(200).json({ ...user.dataValues, ...doctor.dataValues });
    } else {
      res.status(200).json(user);
    }
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
    if (req.body.rolId == 2) {
      await models.doctors.create({
        academicTitle: req.body.academicTitle,
        university: req.body.university,
        profesionalCardNumber: req.body.profesionalCardNumber,
        PersonDocument: req.body.document,
        specialtyId: req.body.specialtyId,
        academicLevelId: req.body.academicLevelId,
      });
    }

    res.status(200).json({ message: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error Server" });
  }
};

controller.UpdateProfile = async (req, res) => {
  console.log(req.body);
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

controller.updateUser = async (req, res) => {
  try {
    await models.people.update(req.body, {
      where: {
        document: req.params.document,
      },
    });
    console.log(req.body);
    if (req.body.rolId == 2) {
      await models.doctors.update(req.body, {
        where: {
          PersonDocument: req.params.document,
        },
      });
    }
    res.status(200).json({ message: "Usario actualizado con exito!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.deleteUser = async (req, res) => {
  try {
    const response = await models.users.update(
      { state: false },
      {
        where: {
          document: req.params.document,
        },
      }
    );
    console.log(response);
    res.status(200).json({ message: "Usuario Inactivado con exito!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
