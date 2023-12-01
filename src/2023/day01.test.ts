import {
  parseCalibrationDocument,
  getCalibrationValuesSum,
  getCorrectCalibrationValuesSum,
  getCorrectCalibrationValue,
} from './day01';

describe('day01PartOne', () => {
  it('returns the sum of the calibration values', () => {
    const input = `
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
    `;

    const document = parseCalibrationDocument(input);
    const sum = getCalibrationValuesSum(document);
    expect(sum).toEqual(142);
  });
});

describe('getCorrectCalibrationValue', () => {
  const cases = [
    {
      input: 'one',
      expected: 11,
    },
    {
      input: 'two',
      expected: 22,
    },
    {
      input: 'three',
      expected: 33,
    },
    {
      input: 'four',
      expected: 44,
    },
    {
      input: 'five',
      expected: 55,
    },
    {
      input: 'six',
      expected: 66,
    },
    {
      input: 'seven',
      expected: 77,
    },
    {
      input: 'eight',
      expected: 88,
    },
    {
      input: 'nine',
      expected: 99,
    },
    {
      input: 'twone',
      expected: 21,
    },
    {
      input: 'eightwo',
      expected: 82,
    },
    {
      input: 'nineight',
      expected: 98,
    },
    {
      input: 'eighthree',
      expected: 83,
    },
    {
      input: 'nineeight',
      expected: 98,
    },
    {
      input: 'eeeight',
      expected: 88,
    },
    {
      input: 'oooneeone',
      expected: 11,
    },
    {
      input: 'eightwothree',
      expected: 83,
    },
  ];

  test.each(cases)(
    'returns the correct calibration value',
    ({ input, expected }) => {
      const value = getCorrectCalibrationValue(input);
      expect(value).toEqual(expected);
    }
  );
});

describe('day01PartTwo', () => {
  it('returns the sum of the calibration values detecting spelled out numbers', () => {
    const input = `
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
    `;

    const document = parseCalibrationDocument(input);
    const sum = getCorrectCalibrationValuesSum(document);
    expect(sum).toEqual(281);
  });
});
