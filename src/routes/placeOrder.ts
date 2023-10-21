import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { OrderRequest } from "../interfaces/OrderRequest";
import { getStockData } from "../service/stock/getStockData";

const TAG = "[placeOrder]";

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req);
    const orderReq = req.body as OrderRequest;
    const { milk, skins } = orderReq?.order;
    const currentDay = parseInt(req.params.day);

    //Sending incremented value of currentDay as getStockData works on elapsed time
    //but we are dealing T that has not elapsed
    const stock = await getStockData(currentDay+1);

    if (milk <= stock.milk && skins <= stock.skins) {
      return res.status(HttpStatus.CREATED).json({
        milk,
        skins,
      });
    } else if (milk > stock.milk && skins <= stock.skins) {
      return res.status(HttpStatus.PARTIAL_CONTENT).json({
        skins,
      });
    } else if (milk < stock.milk && skins > stock.skins) {
      return res.status(HttpStatus.PARTIAL_CONTENT).json({
        milk,
      });
    }
    return res.status(HttpStatus.NOT_FOUND).json({});
  } catch (err) {
    const error = err as Error;
    const message = "An error occurred while placing an order";
    console.log(`${TAG} ${error.toString()}`, { error });

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message,
    });
  }
};
