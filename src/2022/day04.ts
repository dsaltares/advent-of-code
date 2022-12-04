import { readFileSync } from 'fs';

export const day04PartOne = () => {
  const ranges = readRanges();
  return countFullyOverlapping(ranges);
};

export const day04PartTwo = () => {
  const ranges = readRanges();
  return countPartiallyOverlapping(ranges);
};

const readRanges = () =>
  parseRanges(readFileSync('./data/2022/day04.txt', 'utf-8'));

export const parseRanges = (input: string) =>
  input
    .split('\n')
    .filter((line) => !!line.trimStart().trimEnd())
    .map((line) =>
      line
        .split(',')
        .map((range) => range.split('-').map((value) => parseInt(value, 10)))
    );

export const countFullyOverlapping = (allRanges: number[][][]) =>
  countFn(allRanges, fullyOverlap);

const fullyOverlap = ([first, second]: number[][]) =>
  (first[0] <= second[0] && first[1] >= second[1]) ||
  (second[0] <= first[0] && second[1] >= first[1]);

export const countPartiallyOverlapping = (allRanges: number[][][]) =>
  countFn(allRanges, partiallyOverlap);

const partiallyOverlap = ([first, second]: number[][]) =>
  (first[0] <= second[0] && first[1] >= second[0]) ||
  (second[0] <= first[0] && second[1] >= first[0]);

const countFn = (
  allRanges: number[][][],
  fn: (ranges: number[][]) => boolean
) => {
  let count = 0;
  allRanges.forEach((ranges) => {
    if (fn(ranges)) {
      count++;
    }
  });
  return count;
};
