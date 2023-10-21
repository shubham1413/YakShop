import { dateSchema } from "../validation/schema/dateSchema";
import { Request, Response, NextFunction } from "express";

const Validator = require("fastest-validator");

const validator = new Validator();

export const validateDateParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dateParams = {
    from: req.query.from,
    to: req.query.to,
  };

  const validationResult = validator.validate(dateParams, dateSchema);

  if (validationResult === true) {
    next();
  } else {
    let errors;
    if (Array.isArray(validationResult)) {
      errors = validationResult.map((error) => error.message);
    }
    res.status(400).json({ errors });
  }
};
