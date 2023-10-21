import { Stock } from "../../interfaces/Stock";
import { readDataFromFile } from "../../utilities/readDataFromFile";
import { calculateStock } from "../calculateStock";

export const getStockData = async (elapsedTime: number): Promise<Stock> => {
  const filename = "src/herd.xml";

  const herd = await readDataFromFile(filename);
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
