const { models } = require("../Models/index");
const { Op } = require("sequelize");

const controller = {};

controller.getDoctors = async (req, res) => {
  try {
    models.doctors
      .findAll({ include: [models.people] })
      .then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.registerAppoiment = async (req, res) => {
  try {
    console.log(req.body);
    await models.appointments.create({
      reason: req.body.reason,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      specialtyId: req.body.specialtyId,
      PersonDocument: req.body.PersonDocument,
      doctorId: req.body?.doctorId,
    });
    res.status(200).json({ message: "Cita creada con exito" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAppoimentsDoctor = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      where: {
        doctorId: req.params.id,
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
        PersonDocument: req.params.document,
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.updateAppoiment = async (req, res) => {
  try {
    await models.appointments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Cita Actualizada Correctamente" });
  } catch (error) {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.getAppoimentsPending = async (req, res) => {
  try {
    const Appoments = await models.appointments.findAll({
      where: {
        doctorId: null,
        status: {
          [Op.ne]: "Cancelada", // Utilizamos [Op.ne] para verificar que el estado no sea "Cancelada"
        },
      },
      include: [models.people, models.specialties],
    });
    res.status(200).json(Appoments);
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.createAppoimentNoAuth = async (req, res) => {
  let person = await models.people.findOne({
    where: {
      document: req.body.document,
    },
  });
  console.log(person);
  try {
    if (!person) {
      await models.people.create({
        document: req.body.document,
        name: req.body.name,
        lastName: req.body.lastName,
        cellPhone: req.body.cellPhone,
        email: req.body.email,
        address: req.body.address,
        birthDate: req.body.birthDate,
        genderId: req.body.genderId,
        documentTypeId: req.body.documentTypeId,
        rolId: 3,
      });
    }
    await models.appointments.create({
      reason: req.body.reason,
      date: req.body.date,
      time: req.body.time,
      status: "Pendiente",
      specialtyId: req.body.specialtyId,
      PersonDocument: req.body.document,
    });
    res.status(200).json({ message: "Cita creada con exito" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = controller;
