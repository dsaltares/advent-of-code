import { readFileSync } from 'fs';

export const day03PartOne = () => {
  const directions = readDirections();
  return countUniqueHousesVisitedBySanta(directions);
};

export const day03PartTwo = () => {
  const directions = readDirections();
  return countUniqueHousesVisitedBySantaAndRobot(directions);
};

const readDirections = () =>
  parseDirections(readFileSync('./data/2015/day03.txt', 'utf-8'));

export const parseDirections = (input: string) =>
  input.replace('\n', '').trim().split('');

export const countUniqueHousesVisitedBySanta = (directions: string[]) =>
  countUniqueVisits(generateVisitedHouses(directions));

export const countUniqueHousesVisitedBySantaAndRobot = (directions: string[]) =>
  countUniqueVisits([
    ...generateVisitedHouses(
      directions.filter((_value, index) => index % 2 === 1)
    ),
    ...generateVisitedHouses(
      directions.filter((_value, index) => index % 2 === 0)
    ),
  ]);

const generateVisitedHouses = (directions: string[]) => {
  let location = [0, 0];
  const visited = [location];
  directions.forEach((direction) => {
    const newLocation = [...location];
    switch (direction) {
      case '^':
        newLocation[1] += 1;
        break;
      case 'v':
        newLocation[1] -= 1;
        break;
      case '>':
        newLocation[0] += 1;
        break;
      case '<':
        newLocation[0] -= 1;
        break;
    }
    visited.push(newLocation);
    location = newLocation;
  });
  return visited;
};

const countUniqueVisits = (visits: number[][]) =>
  new Set(visits.map(([x, y]) => `${x}:${y}`)).size;
