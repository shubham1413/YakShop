import { herdFilePath } from "../../constants/const";
import { Stock } from "../../interfaces/Stock";
import { readHerdDataFromFile } from "../../utilities/readDataFromFile";
import { calculateStock } from "../calculateStock";

export const getStockData = async (elapsedTime: number): Promise<Stock> => {
  const herd = await readHerdDataFromFile(herdFilePath);
  return calculateStock(herd, elapsedTime);
};

//This is done when get stock is triggered from command line
const [, , arg1] = process.argv;

const elapsedDay = Number(arg1);
if (elapsedDay) {
  getStockData(Number(arg1)).then(() => {
    console.log("Successfully fetched stock details");
  });
}
