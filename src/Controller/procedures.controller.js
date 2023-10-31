const { models } = require("../Models/index");
const controller = {};

controller.createProcedure = async (req, res) => {
  console.log(req.body);
  try {
    const { dataValues } = await models.procedures.create({
      detail: JSON.stringify(req.body.Procedimiento),
      PersonDocument: req.body.DatosCita.PersonDocument,
      appointmentId: req.body.DatosCita.id,
      media: req.body.media ? req.body.media : "Sin adjuntos",
    });
    await models.appointments.update(
      {
        procedureId: dataValues.id,
        status: "Completada",
      },
      {
        where: {
          id: req.body.DatosCita.id,
        },
      }
    );

    res.status(200).json({
      message: "Procedimiento Registrado Correctamente",
      id: dataValues.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.toListAllRegister = async (req, res) => {
  try {
    const allRegister = await models.procedures.findAll({
      where: {
        PersonDocument: req.params.document,
      },
      include: [
        {
          model: models.appointments,
          include: [
            models.specialties,
            { model: models.doctors, include: [models.people] },
          ],
        },
      ],
    });
    console.log(allRegister);
    res.status(200).json(allRegister);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.inactivateProcedure = async (req, res) => {
  try {
    await models.procedures.update(
      {
        status: "inactivo",
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Se inactivo el prodecimiento correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.uploadImage = async (req, res) => {
  console.log(req);
  try {
    const response = await models.procedures.update(req.body, {
      where: { id: req.body.id },
    });
    console.log(response);
    res.status(200).json({ message: "Imagen guardada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = controller;
