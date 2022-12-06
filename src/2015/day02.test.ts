import {
  calculateRibbon,
  calculateWrappingPaper,
  parsePresentDimensions,
} from './day02';

const input = `2x3x4
1x1x10`;

describe('day02PartOne', () => {
  it('returns the total wrapping paper needed', () => {
    expect(calculateWrappingPaper(parsePresentDimensions(input))).toEqual(101);
  });
});

describe('day02PartOne', () => {
  it('returns the total ribbon length needed', () => {
    expect(calculateRibbon(parsePresentDimensions(input))).toEqual(48);
  });
});
