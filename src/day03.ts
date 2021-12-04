import { readFileSync } from 'fs';

const getDiagnosticReport = () =>
  readFileSync('./data/day03.txt', 'utf8')
    .split('\n')
    .filter((line) => !!line);

const getDigitCounts = (report: string[], index: number) => {
  const counts: Record<string, number> = {};
  report.forEach((binaryNumber) => {
    const digit = binaryNumber[index];
    const oldCount = counts[digit] || 0;
    counts[digit] = oldCount + 1;
  });
  return counts;
};

type CompareFn = (a: [string, number], b: [string, number]) => number;

const mostCommonCompare = (a: [string, number], b: [string, number]) => {
  if (a[1] - b[1] > 0) {
    return -1;
  } else if (a[1] - b[1] < 0) {
    return 1;
  }

  return 0;
};

const leastCommonCompare = (a: [string, number], b: [string, number]) => {
  if (a[1] - b[1] > 0) {
    return 1;
  } else if (a[1] - b[1] < 0) {
    return -1;
  }

  return 0;
};

const aggregateDigits = (report: string[], fn: CompareFn): number => {
  if (report.length === 0) {
    return 0;
  }

  const aggregated = Array.from(Array(report[0].length).keys()).reduce(
    (acc, idx) => {
      const counts = getDigitCounts(report, idx);
      const sorted = Object.entries(counts).sort(fn);
      const topDigit = sorted[0][0];
      return acc + topDigit;
    },
    ''
  );
  return parseInt(aggregated, 2);
};

export const getGammaRate = (report: string[]) =>
  aggregateDigits(report, mostCommonCompare);

export const getEpsilonRate = (report: string[]) =>
  aggregateDigits(report, leastCommonCompare);

const day03 = () => {
  const report = getDiagnosticReport();
  const gammaRate = getGammaRate(report);
  const epsilonRate = getEpsilonRate(report);
  return gammaRate * epsilonRate;
};

export default day03;
