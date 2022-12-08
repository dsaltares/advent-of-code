import {
  getLongestDistanceVisitingAll,
  getShortestDistanceVisitingAll,
  parseDistances,
} from './day09';

const input = `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

describe('day09PartOne', () => {
  it('returns the shortest distance visiting all cities', () => {
    expect(getShortestDistanceVisitingAll(parseDistances(input))).toEqual(605);
  });
});

describe('day09PartTwo', () => {
  it('returns the longest distance visiting all cities', () => {
    expect(getLongestDistanceVisitingAll(parseDistances(input))).toEqual(982);
  });
});
