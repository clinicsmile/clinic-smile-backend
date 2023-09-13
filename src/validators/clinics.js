import { check } from "express-validator";
import validOrAbort from "../middleware/validate.js";

export default function (app, db) {
  return {
    get: [
      check("location")
        .isLength({ min: 3 })
        .withMessage("validators.url.minLength")
        .isLength({ max: 150 })
        .withMessage("validators.url.maxLength")
      // validOrAbort,
    ]
  };
}
