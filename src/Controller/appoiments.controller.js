const { models } = require("../Models/index");
const { Op, Model, where } = require("sequelize");
const { EmailController } = require("./controller.email");
const { saveLogs } = require("./savelogs.helper");

const controller = {};

controller.getDoctors = async (req, res) => {
  try {
    models.doctors
      .findAll({ include: [models.people] })
      .then((value) => res.status(200).json(value));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.registerAppoiment = async (req, res) => {
  try {
    const appoimentData = {
      reason: req.body.reason,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      specialtyId: req.body.specialtyId,
      PersonId: req.body.PersonId,
    };

    if (req.body?.doctorId) {
      appoimentData.doctorDoctorId = req.body.doctorId;
    }

    const appoiment = await models.appointments.create(appoimentData);
    const appoimentWithRelations = await models.appointments.findOne({
      where: { id: appoiment.id },
      include: [
        models.people,
        { model: models.doctors, include: [models.people] },
      ],
    });
    res.status(200).json({ message: "Cita creada con exito" });
    saveLogs({
      accion: `Registro de cita`,
      data: req.body,
    });

    if (req.body?.doctorId) {
      EmailController.CorreoNuevaCita({
        ...appoimentWithRelations.dataValues.Person,
        ...appoimentWithRelations.dataValues.Doctor,
        ...appoiment.dataValues,
      });
    } else {
      EmailController.CorreoAceptacionCita({
        ...appoimentWithRelations.dataValues.Person.dataValues,
        ...appoiment.dataValues,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAppoimentsDoctor = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      where: {
        doctorDoctorId: req.params.id,
        status: {
          [Op.ne]: "Cancelada", // Utilizamos [Op.ne] para verificar que el estado no sea "Cancelada"
        },
      },
      include: [
        models.people,
        models.specialties,
        {
          model: models.doctors,
          include: [models.people],
        },
      ],
    });
    res.status(200).json(Appoments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAppoimentsPaciente = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      where: {
        PersonId: req.params.id,
      },
      include: [
        models.people,
        models.specialties,
        {
          model: models.doctors,
          include: [models.people],
        },
      ],
    });
    res.status(200).json(Appoments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.updateAppoiment = async (req, res) => {
  try {
    await models.appointments.update(
      {
        doctorDoctorId: req.body?.doctorId,
        status: req.body?.status,
        reason: req.body?.reason,
        date: req.body?.date,
        PersonId: req.body?.PersonId,
        specialtyId: req.body?.specialtyId,
        time: req.body?.time,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Cita Actualizada Correctamente" });
    saveLogs({
      accion: `Actualización de cita`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAllAppoiments = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      include: [
        models.people,
        models.specialties,
        {
          model: models.doctors,
          include: [models.people],
        },
      ],
    });
    res.status(200).json(Appoments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAppoimentsPending = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      where: {
        doctorDoctorId: null,
        status: {
          [Op.ne]: "Cancelada", // Utilizamos [Op.ne] para verificar que el estado no sea "Cancelada"
        },
      },
      include: [models.people, models.specialties],
    });
    res.status(200).json(Appoments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.cancelAppoiment = async (req, res) => {
  try {
    await models.appointments.update(
      { status: "Cancelada" },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Cita Cancelada Correctamente" });
    saveLogs({
      accion: `Cancelación de cita`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.createAppoimentNoAuth = async (req, res) => {
  try {
    const [user, created] = await models.people.findOrCreate({
      where: {
        document: req.body.document,
      },
      defaults: {
        name: req.body.name,
        lastName: req.body.lastName,
        cellPhone: req.body.cellPhone,
        email: req.body.email,
        address: req.body.address,
        birthDate: req.body.birthDate,
        genderId: req.body.genderId,
        documentTypeId: req.body.documentTypeId,
        rolId: 3,
      },
    });

    await models.users.findOrCreate({
      where: { PersonId: user.dataValues.id },
      defaults: {
        username: req.body.document,
        password: req.body.document.substring(
          req.body.document.length - 4,
          req.body.document.length
        ),
        PersonId: user.dataValues.id,
      },
    });

    await models.appointments.create({
      reason: req.body.reason,
      date: req.body.date,
      time: req.body.time,
      status: "Pendiente",
      specialtyId: req.body.specialtyId,
      PersonId: user?.dataValues?.id,
    });

    res.status(200).json({
      message: "Cita creada con exito",
    });
    saveLogs({
      accion: `Registro de cita sin autenticación`,
      data: req.body,
    });
    EmailController.CorreoAceptacionCita({ ...user.dataValues, ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getPatients = async (req, res) => {
  try {
    models.people
      .findAll({ where: { rolId: 3 } })
      .then((value) => res.status(200).json(value));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
