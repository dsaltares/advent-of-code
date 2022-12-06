import { readFileSync } from 'fs';

export const day02PartOne = () => {
  const dimensions = readPresentDimensions();
  return calculateWrappingPaper(dimensions);
};

export const day02PartTwo = () => {
  const dimensions = readPresentDimensions();
  return calculateRibbon(dimensions);
};

const readPresentDimensions = () =>
  parsePresentDimensions(readFileSync('./data/2015/day02.txt', 'utf-8'));

export const parsePresentDimensions = (input: string) =>
  input
    .split('\n')
    .filter((line) => !!line)
    .map((line) =>
      line
        .trim()
        .split('x')
        .map((value) => parseInt(value, 10))
    );

export const calculateWrappingPaper = (dimensions: number[][]) =>
  dimensions.reduce(
    (total, [l, w, h]) =>
      total + 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l),
    0
  );

export const calculateRibbon = (dimensions: number[][]) =>
  dimensions.reduce(
    (total, [l, w, h]) =>
      total +
      l * w * h +
      [l, w, h]
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((acc, side) => acc + side * 2, 0),
    0
  );
