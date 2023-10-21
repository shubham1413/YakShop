import * as fs from "fs";
import * as xml2js from "xml2js";
import { Sales } from "../interfaces/Sales";

export const readSalesDataFromFile = (filename: string): Promise<Sales> => {
  return new Promise((resolve, reject) => {
    const xml = fs.readFileSync(filename, "utf-8");

    xml2js.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const sale: Sales = {
          day: result.Sales.Day.map((day: any) => ({
            date: day.$.date,
            milk: Number(day.$.milk),
            skins: Number(day.$.skins),
          })),
        };
        resolve(sale);
      }
    });
  });
};
