import { Herd } from "../interfaces/Herd";
import { Stock } from "../interfaces/Stock";
import { Yak } from "../interfaces/Yak";
import { isYakAlive } from "./isYakAlive";
import { canShaveYak } from "./stock/canShaveYak";
import { computeMilkStock } from "./stock/computeMilkStock";

/**
 * Calculates the stock of milk and wool after elapsed time.
 *
 * @param herd - The herd of yaks.
 * @param elapsedTime - The elapsed time in days.
 * @returns The stock of milk and wool.
 */
export const calculateStock = (herd: Herd, elapsedTime: number): Stock => {
  let totalMilk = 0;
  let totalWool = 0;
  console.log("Stock:");
  for (let day = 0; day < elapsedTime; day++) {
    herd.labyak.forEach((yak: Yak) => {
      if (isYakAlive(yak.age)) {
        const milk = computeMilkStock(yak.age);
        totalMilk += milk;

        if (canShaveYak(yak.age, yak.ageLastShaved)) {
          totalWool += 1;
          yak.ageLastShaved = yak.age;
        }
        yak.age += 1;
      }
    });
  }
  console.log(`Total ${totalMilk.toFixed(3)} liters of milk`);
  console.log(`Total Wool: ${totalWool} skins`);

  console.log("Herd:");

  herd.labyak.forEach((yak) => {
    console.log(`${yak.name} ${(yak.age / 100).toFixed(2)} years old`);
  });
  return { milk: totalMilk, skins: totalWool };
};
