import {
  getSandCapacityFloor,
  getSandCapacityNoFloor,
  parseCaveMap,
} from './day14';

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('day14PartOne', () => {
  it('returns the sand capacity of the cave', () => {
    expect(getSandCapacityNoFloor(parseCaveMap(input))).toEqual(24);
  });
});

describe('day14PartTwo', () => {
  it('returns the sand capacity of the cave assumming there is a floor', () => {
    expect(getSandCapacityFloor(parseCaveMap(input))).toEqual(93);
  });
});
