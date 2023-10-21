import { salesFilePath } from "../../constants/const";
import { Stock } from "../../interfaces/Stock";
import { readSalesDataFromFile } from "../../utilities/readSalesDataFromFile";

export const getSalesDetails = async (
  startDate: Date | null,
  endDate: Date | null
): Promise<Stock> => {
  const sales = await readSalesDataFromFile(salesFilePath);
  const { day } = sales;
  let milk = 0;
  let skins = 0;

  if (startDate && endDate) {
    for (const sale of day) {
      const date = new Date(sale.date).getUTCDate();
      if (date >= startDate.getUTCDate() && date <= endDate.getUTCDate()) {
        milk += sale.milk;
        skins += sale.skins;
      }
    }
  }
  return { milk, skins };
};
