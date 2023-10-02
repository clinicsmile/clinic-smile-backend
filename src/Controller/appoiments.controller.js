const { models } = require("../Models/index");
const controller = {};

controller.getDoctors = async (req, res) => {
  try {
    models.doctors.findAll().then((value) => res.status(200).json(value));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

controller.registerAppoiment = async (req, res) => {
  try {
    await models.appointments.create(req.body);
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
      },
      include: [models.people, models.specialties,models.doctors],
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
      include: [models.people, models.specialties,models.doctors],
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
    const Appoments = await models.appointments.findAll();
    res.status(200).json(Appoments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = controller;
