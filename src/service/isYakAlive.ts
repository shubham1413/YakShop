/**
 * Determines whether a yak is alive based on its age.
 * @param age - The age of the yak.
 * @returns A boolean value indicating whether the yak is alive.
 */
export const isYakAlive = (age: number): boolean => {
  if (age >= 1000) {
    return false;
  }
  return true;
};
