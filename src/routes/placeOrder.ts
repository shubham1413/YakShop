import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { stockService } from "../stock";
import { OrderRequest } from "../interfaces/OrderRequest";

const TAG = "[placeOrder]";

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req);
    const orderReq = req.body as OrderRequest;
    const { milk, skins } = orderReq?.order;
    const elapsedDay = parseInt(req.params.day);

    const stock = await stockService(elapsedDay);

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
