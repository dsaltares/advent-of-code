import { readFileSync } from 'fs';

const SANTAS_TEST_TIME = 2503;

export const day14PartOne = () =>
  maxDistance(readReindeers(), SANTAS_TEST_TIME);

export const day14PartTwo = () => maxPoints(readReindeers(), SANTAS_TEST_TIME);

const readReindeers = () =>
  parseReindeers(readFileSync('./data/2015/day14.txt', 'utf-8'));

export const parseReindeers = (input: string): Reindeer[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const matches = line.match(
        /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) second./
      ) as RegExpMatchArray;
      return {
        name: matches[1],
        speed: parseInt(matches[2]),
        flyTime: parseInt(matches[3]),
        restTime: parseInt(matches[4]),
      };
    });

export const maxDistance = (reindeers: Reindeer[], time: number) =>
  Math.max(...reindeers.map((reindeer) => distanceTravelled(reindeer, time)));

export const maxPoints = (reindeers: Reindeer[], time: number) => {
  const points = reindeers.reduce(
    (acc, { name }) => ({
      ...acc,
      [name]: 0,
    }),
    {} as Record<string, number>
  );
  Array.from(Array(time)).forEach((_, tIndex) => {
    const t = tIndex + 1;
    const distances = reindeers.map((reindeer) =>
      distanceTravelled(reindeer, t)
    );
    const maxDistance = Math.max(...distances);
    reindeers.forEach(({ name }, index) => {
      if (distances[index] >= maxDistance) {
        points[name] += 1;
      }
    });
  });
  return Math.max(...Object.values(points));
};

const distanceTravelled = (
  { speed, flyTime, restTime }: Reindeer,
  time: number
) => {
  const cycleLength = flyTime + restTime;
  const fullCycles = Math.floor(time / cycleLength);
  const remainingFlyTime = Math.min(time % cycleLength, flyTime);
  return fullCycles * speed * flyTime + remainingFlyTime * speed;
};

type Reindeer = {
  name: string;
  speed: number;
  flyTime: number;
  restTime: number;
};
