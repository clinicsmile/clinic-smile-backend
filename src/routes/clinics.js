import ClinicController from "../controllers/clinics.js";
import Validator from "../validators/clinics.js";

export default function (app, db) {
  const router = app.Router();

  const controller = ClinicController(app, db);
  const validate = Validator(app, db);

  router.post("/get", validate.get, controller.get);

  return router;
}
