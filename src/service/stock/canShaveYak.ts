/**
 * Determines if a yak can be shaved based on its age and the number of days since it was last shaved.
 *
 * @param ageInDays - The age of the yak in days.
 * @param lastShaved - The number of days since the yak was last shaved.
 * @returns A boolean indicating if the yak can be shaved.
 */
export const canShaveYak = (ageInDays: number, lastShaved: number): boolean => {
  let shaved = 0;
  if (ageInDays >= 100) {
    if (lastShaved) {
      shaved = lastShaved;
    }
    const shaveFrequency = 8 + ageInDays * 0.01;
    return ageInDays - shaved >= shaveFrequency ? true : false;
  }
  return false;
};
