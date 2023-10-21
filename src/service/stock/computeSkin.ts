import { Herd } from "../../interfaces/Herd";
import { Yak } from "../../interfaces/Yak";
import { isYakAlive } from "../isYakAlive";
import { canShaveYak } from "./canShaveYak";

/**
 * Computes the details of the yak herd after elapsed time.
 *
 * @param herd - The herd of yaks.
 * @param elapsedTime - The elapsed time in days.
 * @returns An array of yak details after elapsed time.
 */
export const computeHerd = (herd: Herd, elapsedTime: number): Yak[] => {
  for (let day = 0; day < elapsedTime; day++) {
    herd.labyak.forEach((yak: Yak) => {
      if (isYakAlive(yak.age)) {
        if (canShaveYak(yak.age, yak.ageLastShaved)) {
          yak.ageLastShaved = yak.age;
        }
        yak.age += 1;
      }
    });
  }

  let finalYakDetails: Yak[];
  finalYakDetails = herd.labyak.map((yak: Yak) => ({
    name: yak.name,
    age: yak.age / 100,
    ageLastShaved: yak.ageLastShaved / 100,
  }));

  return finalYakDetails;
};
