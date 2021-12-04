import { countLargerThanPrevious } from './day01';

describe('countLargerThanPrevious', () => {
  it('returns 0 for empty array', () => {
    const measurements: number[] = [];
    const count = countLargerThanPrevious(measurements);
    expect(count).toEqual(0);
  });

  it('returns 0 when no measurement is greater than the previous one', () => {
    const measurements = [4, 3, 2, 1];
    const count = countLargerThanPrevious(measurements);
    expect(count).toEqual(0);
  });

  it('returns correct number of measurements greater than the previous one', () => {
    const measurements = [1, 2, 1, 4, 5, 3, 4];
    const count = countLargerThanPrevious(measurements);
    expect(count).toEqual(4);
  });
});
