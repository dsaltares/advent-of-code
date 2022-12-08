import {
  countVisibleTrees,
  getHighestScenicScore,
  parseHeightMap,
} from './day08';

const input = `30373
25512
65332
33549
35390`;

describe('day08PartOne', () => {
  it('counts the visible trees', () => {
    expect(countVisibleTrees(parseHeightMap(input))).toEqual(21);
  });
});

describe('day08PartOne', () => {
  it('gets highest scenic score', () => {
    expect(getHighestScenicScore(parseHeightMap(input))).toEqual(8);
  });
});
