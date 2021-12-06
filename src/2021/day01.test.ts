import {
  countLargerThanPrevious,
  countLargerThanPreviousWindow,
} from './day01';

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

describe('countLargerThanPreviousWindow', () => {
  it('returns 0 when passed less than 2 measurements', () => {
    const measurements = [1, 2];
    const count = countLargerThanPreviousWindow(measurements);
    expect(count).toEqual(0);
  });

  it('returns 0 when passed 3 measurements', () => {
    const measurements = [1, 2, 3];
    const count = countLargerThanPreviousWindow(measurements);
    expect(count).toEqual(0);
  });

  it('returns 0 when passed 4 measurements and no increment', () => {
    const measurements = [4, 3, 2, 1];
    const count = countLargerThanPreviousWindow(measurements);
    expect(count).toEqual(0);
  });

  it('returns correct number of increments', () => {
    const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    const count = countLargerThanPreviousWindow(measurements);
    expect(count).toEqual(5);
  });
});
