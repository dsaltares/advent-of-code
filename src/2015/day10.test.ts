import { lookAndSay } from './day10';

describe('lookAndSay', () => {
  test.each([
    { sequence: '1', expected: '11' },
    { sequence: '11', expected: '21' },
    { sequence: '21', expected: '1211' },
    { sequence: '1211', expected: '111221' },
    { sequence: '111221', expected: '312211' },
  ])(
    'returns the look and say sequence for $sequence',
    ({ sequence, expected }) => {
      expect(lookAndSay(sequence)).toEqual(expected);
    }
  );
});
