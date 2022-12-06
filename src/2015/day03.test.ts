import {
  countUniqueHousesVisitedBySanta,
  countUniqueHousesVisitedBySantaAndRobot,
  parseDirections,
} from './day03';

describe('day03PartOne', () => {
  test.each([
    { input: '>', expected: 2 },
    { input: '^>v<', expected: 4 },
    { input: '^v^v^v^v^v', expected: 2 },
  ])(
    'counts unique houses visited by Santa for $input',
    ({ input, expected }) => {
      expect(countUniqueHousesVisitedBySanta(parseDirections(input))).toEqual(
        expected
      );
    }
  );
});

describe('day03PartTwo', () => {
  test.each([
    { input: '^v', expected: 3 },
    { input: '^>v<', expected: 3 },
    { input: '^v^v^v^v^v', expected: 11 },
  ])(
    'counts unique houses visited by Santa and Robot-Santa for $input',
    ({ input, expected }) => {
      expect(
        countUniqueHousesVisitedBySantaAndRobot(parseDirections(input))
      ).toEqual(expected);
    }
  );
});
