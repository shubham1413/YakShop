/**
 * Calculates the remaining stock of milk based on the age in days.
 *
 * @param ageInDays - The age of the milk in days.
 * @returns The remaining stock of milk.
 */
export const computeMilkStock = (ageInDays: number): number => {
  return 50 - ageInDays * 0.03;
};
