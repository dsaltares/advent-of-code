import { readFileSync } from 'fs';

const getDepthsMeasurements = () =>
  readFileSync('./data/2021/day01.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => parseInt(line, 10));

export const countLargerThanPrevious = (measurements: number[]) =>
  measurements.reduce((count, measurement, index) => {
    if (index > 0 && measurement > measurements[index - 1]) {
      return count + 1;
    }
    return count;
  }, 0);

export const countLargerThanPreviousWindow = (measurements: number[]) => {
  if (measurements.length < 3) {
    return 0;
  }
  const windowSums = Array.from(Array(measurements.length - 2).keys()).map(
    (index) =>
      measurements[index] + measurements[index + 1] + measurements[index + 2]
  );
  return countLargerThanPrevious(windowSums);
};

const day01 = () => {
  const measurements = getDepthsMeasurements();
  return countLargerThanPrevious(measurements);
};

export const day01PartTwo = () => {
  const measurements = getDepthsMeasurements();
  return countLargerThanPreviousWindow(measurements);
};

export default day01;
