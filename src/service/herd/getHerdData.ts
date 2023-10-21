import { herdFilePath } from "../../constants/const";
import { Yak } from "../../interfaces/Yak";
import { readHerdDataFromFile } from "../../utilities/readDataFromFile";
import { computeHerd } from "../stock/computeSkin";

export const getHerdData = async (elapsedTime: number): Promise<Yak[]> => {
  const herd = await readHerdDataFromFile(herdFilePath);
  return computeHerd(herd, elapsedTime);
};
