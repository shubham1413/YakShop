import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { stockService } from "../stock";

const TAG = "[getStock]";

export const getStock = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const elapsedDay = parseInt(req.params.day);

    const stock = await stockService(elapsedDay);
    return res.status(HttpStatus.OK).json({
      ...stock,
    });
  } catch (err) {
    const error = err as Error;
    const message = "An error occurred fetching stock";
    console.log(`${TAG} ${error.toString()}`, { error });

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
};
