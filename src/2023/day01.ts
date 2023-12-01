import { readFileSync } from 'fs';

export const day01PartOne = () => {
  const calibrationDocument = readCalibrationDocument();
  return getCalibrationValuesSum(calibrationDocument);
};

const readCalibrationDocument = () =>
  parseCalibrationDocument(readFileSync('./data/2023/day01.txt', 'utf-8'));

export const parseCalibrationDocument = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

export const getCalibrationValuesSum = (document: string[]) =>
  document.reduce<number>((sum, line) => {
    const chars = line.split('');
    const firstDigit = chars[chars.findIndex(isDigit)];
    const lastDigit = chars[chars.reverse().findIndex(isDigit)];
    const calibrationValue = parseInt(firstDigit + lastDigit, 10);
    return sum + calibrationValue;
  }, 0);

const isDigit = (char: string) => char >= '0' && char <= '9';
