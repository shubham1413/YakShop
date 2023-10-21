import Validator from "fastest-validator";
import { Request, Response, NextFunction } from "express";
import { orderSchema } from "../validation/schema/orderSchema";

const validator = new Validator();

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const order = req.body;

  const validationResult = validator.validate(order, orderSchema);

  if (validationResult === true) {
    next();
  } else {
    let errors;
    if (Array.isArray(validationResult))
      errors = validationResult.map((error) => error.message);

    res.status(400).json({ errors });
  }
};
