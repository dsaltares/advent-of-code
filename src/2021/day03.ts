import { readFileSync } from 'fs';

const getDiagnosticReport = () =>
  readFileSync('./data/2021/day03.txt', 'utf8')
    .split('\n')
    .filter((line) => !!line);

export const getBitCounts = (report: string[], index: number) => {
  const counts: Record<string, number> = { '0': 0, '1': 0 };
  report.forEach((binaryNumber) => {
    counts[binaryNumber[index]] += 1;
  });
  return counts;
};

type CommonalityBitPickerFn = (report: string[], idx: number) => string;

export const getMostCommonBitAt: CommonalityBitPickerFn = (
  report: string[],
  idx: number
) => {
  const counts = getBitCounts(report, idx);
  return counts['1'] >= counts['0'] ? '1' : '0';
};

export const getLeastCommonBitAt: CommonalityBitPickerFn = (
  report: string[],
  idx: number
) => {
  const counts = getBitCounts(report, idx);
  if (counts['0'] === 0) {
    return '1';
  } else if (counts['1'] === 0) {
    return '0';
  }

  return counts['0'] <= counts['1'] ? '0' : '1';
};

const aggregateByBitCommonality = (
  report: string[],
  pickBit: CommonalityBitPickerFn
): number => {
  if (report.length === 0) {
    return 0;
  }
  const aggregated = Array.from(Array(report[0].length).keys()).reduce(
    (acc, idx) => acc + pickBit(report, idx),
    ''
  );
  return parseInt(aggregated, 2);
};

const aggregateByBitCriteria = (
  report: string[],
  pickBit: CommonalityBitPickerFn
) => {
  if (report.length === 0) {
    return 0;
  }

  const numBits = report[0].length;
  let filteredReport = [...report];
  for (let idx = 0; idx < numBits && filteredReport.length > 1; idx++) {
    const bit = pickBit(filteredReport, idx);
    filteredReport = filteredReport.filter(
      (binaryNumber) => binaryNumber[idx] === bit
    );
  }

  return parseInt(filteredReport[0], 2);
};

export const getGammaRate = (report: string[]) =>
  aggregateByBitCommonality(report, getMostCommonBitAt);

export const getEpsilonRate = (report: string[]) =>
  aggregateByBitCommonality(report, getLeastCommonBitAt);

const day03 = () => {
  const report = getDiagnosticReport();
  const gammaRate = getGammaRate(report);
  const epsilonRate = getEpsilonRate(report);
  return gammaRate * epsilonRate;
};

export const getOxygenGeneratorRating = (report: string[]) =>
  aggregateByBitCriteria(report, getMostCommonBitAt);

export const getCO2ScrubberRating = (report: string[]) =>
  aggregateByBitCriteria(report, getLeastCommonBitAt);

export const day03PartTwo = () => {
  const report = getDiagnosticReport();
  const oxygenGeneratorRating = getOxygenGeneratorRating(report);
  const co2ScrubberRating = getCO2ScrubberRating(report);
  return oxygenGeneratorRating * co2ScrubberRating;
};

export default day03;
