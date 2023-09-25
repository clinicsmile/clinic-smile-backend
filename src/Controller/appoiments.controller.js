const { models } = require("../Models/index");
const controller = {};


controller.getDoctors = async (req, res) =>{
  try {
    models.doctors.findAll().then((value) => res.status(200).json(value))
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
controller.registerAppoiment = async (req, res) =>{
  try {
    await models.appointments.create(req.body).then((value) => res.status(200).json({message:"Cita creada con exito"}));
  } catch (error) {
    console.log(error);
  }
}


module.exports = controller;
