import { readFileSync } from 'fs';

export const day01PartOne = () => {
  const directions = readDirections();
  return getFloor(directions);
};

export const day01PartTwo = () => {
  const directions = readDirections();
  return getBasementDirectionPosition(directions);
};

const readDirections = () =>
  parseDirections(readFileSync('./data/2015/day01.txt', 'utf-8'));

export const parseDirections = (input: string) =>
  input.trim().replace('\n', '').split('');

export const getFloor = (directions: string[]) =>
  directions.reduce(
    (floor, direction) => (direction === '(' ? floor + 1 : floor - 1),
    0
  );

export const getBasementDirectionPosition = (directions: string[]) => {
  let floor = 0;
  for (let i = 0; i < directions.length; ++i) {
    floor = directions[i] === '(' ? floor + 1 : floor - 1;
    if (floor === -1) {
      return i + 1;
    }
  }
};
