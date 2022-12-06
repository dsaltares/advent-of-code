import {
  getBasementDirectionPosition,
  getFloor,
  parseDirections,
} from './day01';

describe('day01PartOne', () => {
  test.each([
    { input: '(())', expected: 0 },
    { input: '()()', expected: 0 },
    { input: '(((', expected: 3 },
    { input: '(()(()(', expected: 3 },
    { input: '))(((((', expected: 3 },
    { input: '())', expected: -1 },
    { input: '))(', expected: -1 },
    { input: ')))', expected: -3 },
    { input: ')())())', expected: -3 },
  ])(`returns the floor for $input`, ({ input, expected }) => {
    expect(getFloor(parseDirections(input))).toEqual(expected);
  });
});

describe('day01PartTwo', () => {
  test.each([
    { input: ')', expected: 1 },
    { input: '()())', expected: 5 },
  ])(
    `returns the basement direction index for $input`,
    ({ input, expected }) => {
      expect(getBasementDirectionPosition(parseDirections(input))).toEqual(
        expected
      );
    }
  );
});
