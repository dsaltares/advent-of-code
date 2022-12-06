import { getLowestNumberWith5ZeroHash } from './day04';

describe('day04PartOne', () => {
  test.each([
    { input: 'abcdef', expected: 609043 },
    { input: 'pqrstuv', expected: 1048970 },
  ])(
    'calculates the lowest number with a hash starting with 5 zeroes given the key $input',
    ({ input, expected }) => {
      expect(getLowestNumberWith5ZeroHash(input)).toEqual(expected);
    }
  );
});
