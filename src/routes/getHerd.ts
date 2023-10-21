import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { herdService, stockService } from "../stock";

const TAG = "[getHerd]";

export const getHerd = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const elapsedDay = parseInt(req.params.day);

    const herd = await herdService(elapsedDay);
    return res.status(HttpStatus.OK).json({
      herd,
    });
  } catch (err) {
    const error = err as Error;
    const message = "An error occurred while fetching herd";
    console.log(`${TAG} ${error.toString()}`, { error });

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
};
