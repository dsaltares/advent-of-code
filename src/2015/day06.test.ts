import {
  countLightsAfterCorrectInstructions,
  countLightsAfterInstructions,
  parseInstructions,
} from './day06';

describe('day06PartOne', () => {
  test.each([
    { input: 'turn on 0,0 through 999,999', expected: 1000000 },
    { input: 'toggle 0,0 through 999,0', expected: 1000 },
    { input: 'turn off 499,499 through 500,500', expected: 0 },
  ])(
    'counts turn on lights after instructions - $input',
    ({ input, expected }) => {
      expect(countLightsAfterInstructions(parseInstructions(input))).toEqual(
        expected
      );
    }
  );
});

describe('day06PartTwo', () => {
  test.each([
    { input: 'turn on 0,0 through 999,999', expected: 1000000 },
    { input: 'toggle 0,0 through 999,0', expected: 2000 },
    { input: 'turn off 499,499 through 500,500', expected: 0 },
  ])(
    'counts turn on lights after correct instructions - $input',
    ({ input, expected }) => {
      expect(
        countLightsAfterCorrectInstructions(parseInstructions(input))
      ).toEqual(expected);
    }
  );
});
