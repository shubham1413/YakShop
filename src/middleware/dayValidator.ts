import Validator from "fastest-validator";
import { Request, Response, NextFunction } from "express";
import { daySchema } from "../validation/schema/daySchema";

const validator = new Validator();

export const validateDay = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { day } = req.params;

  const validationResult = validator.validate({ day }, daySchema);

  if (validationResult === true) {
    next();
  } else {
    let errors;
    if (Array.isArray(validationResult))
      errors = validationResult.map((error) => error.message);

    res.status(400).json({ errors });
  }
};
