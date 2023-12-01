import { readFileSync } from 'fs';

export const day01PartOne = () => {
  const calibrationDocument = readCalibrationDocument();
  return getCalibrationValuesSum(calibrationDocument);
};

export const day01PartTwo = () => {
  const calibrationDocument = readCalibrationDocument();
  return getCorrectCalibrationValuesSum(calibrationDocument);
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

export const getCorrectCalibrationValuesSum = (document: string[]) =>
  document.reduce<number>(
    (sum, line) => sum + getCorrectCalibrationValue(line),
    0
  );

const isDigit = (char: string) => char >= '1' && char <= '9';

export const getCorrectCalibrationValue = (line: string) =>
  parseInt(getFirstDigit(line) + getLastDigit(line), 10);

const getFirstDigit = (line: string) => {
  let firstDigitIndex = Number.MAX_SAFE_INTEGER;
  let firstDigit = '';
  for (const digit of Object.keys(Digits)) {
    const digitIndex = line.indexOf(digit);
    if (digitIndex > -1 && digitIndex < firstDigitIndex) {
      firstDigitIndex = digitIndex;
      firstDigit = digit;
    }
  }

  return Digits[firstDigit as keyof typeof Digits];
};

const getLastDigit = (line: string) => {
  let lastDigitIndex = Number.MIN_SAFE_INTEGER;
  let lastDigit = '';
  for (const digit of Object.keys(Digits)) {
    const digitIndex = line.lastIndexOf(digit);
    if (digitIndex > -1 && digitIndex > lastDigitIndex) {
      lastDigitIndex = digitIndex;
      lastDigit = digit;
    }
  }

  return Digits[lastDigit as keyof typeof Digits];
};

const Digits = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
};
