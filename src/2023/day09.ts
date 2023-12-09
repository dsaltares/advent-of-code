import { readFileSync } from 'fs';

type Report = number[][];

export const day09PartOne = () => {
  const report = readReport();
  return sumExtrapolatedValuesRight(report);
};

export const day09PartTwo = () => {
  const report = readReport();
  return sumExtrapolatedValuesLeft(report);
};

const readReport = () =>
  parseReport(readFileSync('./data/2023/day09.txt', 'utf-8'));

export const parseReport = (input: string): Report =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(' ').map((num) => parseInt(num, 10)));

export const sumExtrapolatedValuesRight = (report: Report) =>
  report.reduce((acc, history) => acc + extrapolateValueRight(history), 0);

export const sumExtrapolatedValuesLeft = (report: Report) =>
  report.reduce((acc, history) => acc + extrapolateValueLeft(history), 0);

export const extrapolateValueRight = (history: number[]) =>
  extrapolateValue(history, generatePlaceholderRight);

export const extrapolateValueLeft = (history: number[]) =>
  extrapolateValue(history, generatePlaceholderLeft);

const extrapolateValue = (
  history: number[],
  generatePlaceholder: GeneratePlaceholder
) => {
  const differencesList: number[][] = [history, getDifferences(history)];
  while (!allZeroes(differencesList[differencesList.length - 1])) {
    differencesList.push(
      getDifferences(differencesList[differencesList.length - 1])
    );
  }

  const resolvedPlaceholders: number[] = [0];
  for (let i = 1; i < differencesList.length; i++) {
    const differences = differencesList[differencesList.length - i - 1];
    const lastPlaceholder =
      resolvedPlaceholders[resolvedPlaceholders.length - 1];
    resolvedPlaceholders.push(
      generatePlaceholder(differences, lastPlaceholder)
    );
  }
  return resolvedPlaceholders[resolvedPlaceholders.length - 1];
};

type GeneratePlaceholder = (
  differences: number[],
  lastPlaceholder: number
) => number;

const generatePlaceholderLeft: GeneratePlaceholder = (
  differences,
  lastPlaceholder
) => differences[0] - lastPlaceholder;

const generatePlaceholderRight: GeneratePlaceholder = (
  differences,
  lastPlaceholder
) => lastPlaceholder + differences[differences.length - 1];

const getDifferences = (numbers: number[]) => {
  const differences: number[] = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    differences.push(numbers[i + 1] - numbers[i]);
  }
  return differences;
};

const allZeroes = (numbers: number[]) => numbers.every((num) => num === 0);
