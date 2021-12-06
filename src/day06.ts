import { readFileSync } from 'fs';

const readLanternFish = () =>
  readFileSync('./data/day06.txt', 'utf-8')
    .split(',')
    .map((number) => parseInt(number.trimStart().trimEnd(), 10));

export const simulateLanternFish = (fish: number[]) => [
  ...fish.map((current) => (current === 0 ? 6 : current - 1)),
  ...fish.filter((current) => current === 0).map(() => 8),
];

const day06 = () => {
  const fish = readLanternFish();
  const numDays = 80;
  const numberLanternFish = Array.from(Array(numDays)).reduce(
    (updatedFish) => simulateLanternFish(updatedFish),
    fish
  ).length;
  return numberLanternFish;
};

export default day06;
