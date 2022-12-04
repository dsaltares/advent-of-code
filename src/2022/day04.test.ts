import {
  countFullyOverlapping,
  countPartiallyOverlapping,
  parseRanges,
} from './day04';

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe('day04PartOne', () => {
  it('counts fully overlapping ranges', () => {
    const ranges = parseRanges(input);
    const count = countFullyOverlapping(ranges);
    expect(count).toEqual(2);
  });
});

describe('day04PartTwo', () => {
  it('counts pasrtially overlapping ranges', () => {
    const ranges = parseRanges(input);
    const count = countPartiallyOverlapping(ranges);
    expect(count).toEqual(4);
  });
});
