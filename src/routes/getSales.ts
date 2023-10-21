import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { getSalesDetails } from "../service/sales/getSalesDetails";

const TAG = "[getSales]";

export const getSales = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { from, to } = req.query;
    const startDate = from ? new Date(from as string) : null;
    const endDate = to ? new Date(to as string) : null;
    const stock = await getSalesDetails(startDate, endDate);
    return res.status(HttpStatus.OK).json({
      ...stock,
    });
  } catch (err) {
    const error = err as Error;
    const message = "An error occurred fetching sales details";
    console.log(`${TAG} ${error.toString()}`, { error });

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
};
