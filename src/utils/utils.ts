export const numbersArray = (value: number): number[] => {
  return Array.from({ length: value }, (_, i) => i + 1);
};
