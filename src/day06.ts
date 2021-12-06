import { readFileSync } from 'fs';

const readLanternFish = () =>
  readFileSync('./data/day06.txt', 'utf-8')
    .split(',')
    .map((number) => parseInt(number.trimStart().trimEnd(), 10));

export const numberOfLanternFishAfterDays = (fish: number[], days: number) => {
  const babyBreedingTime = 9;
  const adultBreedingTime = 7;

  const calendar: number[] = Array.from(Array(babyBreedingTime)).fill(0);
  fish.forEach((age) => (calendar[age] += 1));

  for (let i = 0; i < days; ++i) {
    const toBreed = calendar.shift() as number;
    calendar.push(toBreed);
    calendar[adultBreedingTime - 1] += toBreed;
  }

  return calendar.reduce((total, countPerAge) => total + countPerAge, 0);
};

const day06 = () => {
  const fish = readLanternFish();
  return numberOfLanternFishAfterDays(fish, 80);
};

export const day06PartTwo = () => {
  const fish = readLanternFish();
  return numberOfLanternFishAfterDays(fish, 256);
};

export default day06;
