import { ExpressValidator } from "express-validator";

export default function (req, res, next) {
  const { validationResult } = new ExpressValidator(
    {},
    {},
    {
      errorFormatter: (error) => error.msg,
    }
  );

  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    const response = {};
    const arr = errorValidation.array();
    const keyFirstError = arr[0].msg;

    for (let i = 0; i < arr.length; i++) {
      if (!response[arr[i].param]) {
        response[arr[i].param] = [];
      }

      response[arr[i].param].push(arr[i].msg);
    }
    return res.status(400).json({
      message: req.translate(keyFirstError),
      errors: response,
    });
  }
  next();
}
