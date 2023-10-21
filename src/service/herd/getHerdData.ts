import { Yak } from "../../interfaces/Yak";
import { readDataFromFile } from "../../utilities/readDataFromFile";
import { computeHerd } from "../stock/computeSkin";

export const getHerdData = async (elapsedTime: number): Promise<Yak[]> => {
  const filename = "src/herd.xml";

  const herd = await readDataFromFile(filename);
  return computeHerd(herd, elapsedTime);
};
