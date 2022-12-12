import {
  getMinStepCountFromLowestHeight,
  getStepCount,
  parseHeightMap,
} from './day12';

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('day12PartOne', () => {
  it('returns the number of steps to reach the goal', () => {
    expect(getStepCount(parseHeightMap(input))).toEqual(31);
  });
});

describe('day12PartTwo', () => {
  it('returns the min number of steps to reach the goal from any low point ', () => {
    expect(getMinStepCountFromLowestHeight(parseHeightMap(input))).toEqual(29);
  });
});
