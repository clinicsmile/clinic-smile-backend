const { models } = require("../Models/index");
const { saveLogs } = require("./savelogs.helper");
const controller = {};

controller.createProcedure = async (req, res) => {
  try {
    const { dataValues } = await models.procedures.create({
      detail: JSON.stringify(req.body.Procedimiento),
      PersonId: req.body.DatosCita.PersonId,
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
    saveLogs({
      accion: `Registro de procedimiento`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.toListAllRegister = async (req, res) => {
  try {
    const user = await models.people.findOne({
      where: {
        document: req.params.document,
      },
    });
    if (user !== null) {
      const allRegister = await models.procedures.findAll({
        where: {
          PersonId: user.dataValues.id,
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
      if (allRegister.length === 0) {
        res
          .status(226)
          .json({ error: "El usuario no tiene procedimientos realizados" });
        return;
      }
      res.status(200).json(allRegister);
      return;
    }
    res.status(226).json({ error: "Usuario No encontrado!!" });
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
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

controller.uploadImage = async (req, res) => {
  try {
    const response = await models.procedures.update(req.body, {
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Imagen guardada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = controller;
