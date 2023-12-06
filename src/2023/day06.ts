import { readFileSync } from 'fs';

type Race = {
  time: number;
  distance: number;
};

export const day06PartOne = () => {
  const races = readRaces();
  return multiplyWaysToWin(races);
};

export const day06PartTwo = () => {
  const race = readRace();
  return waysToWin(race);
};

const readRaces = () =>
  parseRaces(readFileSync('./data/2023/day06.txt', 'utf-8'));

export const parseRaces = (input: string): Race[] => {
  const [times, distances] = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);
  const numberRegExp = /([0-9]+)/g;

  const timesMatch = [...times.matchAll(numberRegExp)];
  const distancesMatch = [...distances.matchAll(numberRegExp)];
  return timesMatch.map((timeMatch, index) => ({
    time: parseInt(timeMatch[0], 10),
    distance: parseInt(distancesMatch[index][0], 10),
  }));
};

const readRace = () =>
  parseRace(readFileSync('./data/2023/day06.txt', 'utf-8'));

export const parseRace = (input: string): Race => {
  const [times, distances] = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);
  const numberRegExp = /([0-9]+)/g;

  const timesMatch = [...times.matchAll(numberRegExp)];
  const distancesMatch = [...distances.matchAll(numberRegExp)];
  return {
    time: parseInt(
      timesMatch.reduce((acc, match) => acc + match[0], ''),
      10
    ),
    distance: parseInt(
      distancesMatch.reduce((acc, match) => acc + match[0], ''),
      10
    ),
  };
};

export const multiplyWaysToWin = (races: Race[]) =>
  races.reduce((acc, race) => acc * waysToWin(race), 1);

export const waysToWin = (race: Race) => {
  let count = 0;
  for (let chargeTime = 0; chargeTime <= race.time; ++chargeTime) {
    const speed = chargeTime;
    const time = race.time - chargeTime;
    const distance = speed * time;
    if (distance > race.distance) {
      ++count;
    }
  }
  return count;
};
