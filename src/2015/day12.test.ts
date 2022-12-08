import {
  parseDocument,
  sumAllNumbers,
  sumAllNumbersExceptObjectsWithRed,
} from './day12';

describe('day12PartOne', () => {
  test.each([
    { input: '[1,2,3]', expected: 6 },
    { input: '{"a":2,"b":4}', expected: 6 },
    { input: '[[[3]]]', expected: 3 },
    { input: '{"a":{"b":4},"c":-1}', expected: 3 },
    { input: '{"a":[-1,1]}', expected: 0 },
    { input: '[-1,{"a":1}]', expected: 0 },
    { input: '[]', expected: 0 },
    { input: '{}', expected: 0 },
  ])(`returns the sum of all numbers in $input`, ({ input, expected }) => {
    expect(sumAllNumbers(parseDocument(input))).toEqual(expected);
  });
});

describe('day12PartTwo', () => {
  test.each([
    { input: '[1,2,3]', expected: 6 },
    { input: '[1,{"c":"red","b":2},3]', expected: 4 },
    { input: '{"d":"red","e":[1,2,3,4],"f":5}', expected: 0 },
    { input: '[1,"red",5]', expected: 6 },
  ])(
    `returns the sum of all numbers except ones with red in $input`,
    ({ input, expected }) => {
      expect(sumAllNumbersExceptObjectsWithRed(parseDocument(input))).toEqual(
        expected
      );
    }
  );
});
