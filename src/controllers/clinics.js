import config from "../config/config.js";

export default function (app, db) {
  const { Clinic } = db;
  const ClinicController = {
    async get(req, res) {
      try {
        const queryBuilder = {
          where: {
            location: req.body.location,
          },
        };

        const clinic = await Clinic.findOne(queryBuilder);
        if (!clinic) {
          return res.json(config.brand);
        }

        return res.json(clinic.getBrand());
      } catch (err) {
        console.error("ClinicController.get", err);
        return res.status(500).json({ message: "server.error" });
      }
    },
  };

  return ClinicController;
}
