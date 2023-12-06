import { multiplyWaysToWin, parseRace, parseRaces, waysToWin } from './day06';

const input = `
Time:      7  15   30
Distance:  9  40  200
`;

describe('waysToWin', () => {
  test.each([
    { time: 7, distance: 9, expected: 4 },
    { time: 15, distance: 40, expected: 8 },
    { time: 30, distance: 200, expected: 9 },
  ])(
    `returns correct number of ways to win for $time ms and $distance mm`,
    ({ time, distance, expected }) => {
      const num = waysToWin({
        time,
        distance,
      });
      expect(num).toEqual(expected);
    }
  );
});

describe('day06PartOne', () => {
  it('returns the product of the number of ways to wins for each race', () => {
    const races = parseRaces(input);
    const num = multiplyWaysToWin(races);
    expect(num).toEqual(288);
  });
});

describe('day06PartTwo', () => {
  it('returns the number of ways to win for a single race with combined data', () => {
    const race = parseRace(input);
    const num = waysToWin(race);
    expect(num).toEqual(71503);
  });
});
