import { readFileSync } from 'fs';

const getDepthsMeasurements = () =>
  readFileSync('./data/day1.txt', 'utf-8')
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

const day01 = () => {
  const measurements = getDepthsMeasurements();
  return countLargerThanPrevious(measurements);
};

export default day01;
