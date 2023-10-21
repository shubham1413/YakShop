import { Stock } from "./interfaces/Stock";
import { Yak } from "./interfaces/Yak";
import { calculateStock } from "./service/calculateStock";
import { computeHerd } from "./service/stock/computeSkin";
import { readDataFromFile } from "./utilities/readDataFromFile";

export const stockService = async (elapsedTime: number): Promise<Stock> => {
  const filename = "src/herd.xml";

  const herd = await readDataFromFile(filename);
  return calculateStock(herd, elapsedTime);
};
export const herdService = async (elapsedTime: number): Promise<Yak[]> => {
  const filename = "src/herd.xml";

  const herd = await readDataFromFile(filename);
  return computeHerd(herd, elapsedTime);
};
