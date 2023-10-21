import { Herd } from "../interfaces/Herd";
import * as fs from "fs";
import * as xml2js from "xml2js";

export const readDataFromFile = (filename: string): Promise<Herd> => {
  return new Promise((resolve, reject) => {
    const xml = fs.readFileSync(filename, "utf-8");

    xml2js.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const herd: Herd = {
          labyak: result.herd.labyak.map((yak: any) => ({
            name: yak.$.name,
            age: parseFloat(yak.$.age) * 100,
            sex: yak.$.sex,
          })),
        };
        resolve(herd);
      }
    });
  });
};
