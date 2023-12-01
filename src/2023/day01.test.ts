import { parseCalibrationDocument, getCalibrationValuesSum } from './day01';

const input = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

describe('day01PartOne', () => {
  it('returns the sum of the calibration values', () => {
    const document = parseCalibrationDocument(input);
    const sum = getCalibrationValuesSum(document);
    expect(sum).toEqual(142);
  });
});
