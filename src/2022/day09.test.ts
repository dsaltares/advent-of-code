import {
  countPositionsVisitedByTailTwoSegments,
  countPositionsVisitedByTailTenSegments,
  parseMotions,
} from './day09';

describe('day09PartOne', () => {
  const input = `R 4
  U 4
  L 3
  D 1
  R 4
  D 1
  L 5
  R 2`;

  it('counts the positions visited by the tail', () => {
    expect(countPositionsVisitedByTailTwoSegments(parseMotions(input))).toBe(
      13
    );
  });
});

describe('day09PartTwo', () => {
  const input = `R 5
  U 8
  L 8
  D 3
  R 17
  D 10
  L 25
  U 20`;

  it('counts the positions visited by the tail when there are 10 segments', () => {
    expect(countPositionsVisitedByTailTenSegments(parseMotions(input))).toBe(
      36
    );
  });
});
