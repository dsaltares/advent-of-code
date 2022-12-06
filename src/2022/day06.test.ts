import {
  getIndexAfterStartOfMessage,
  getIndexAfterStartOfPacket,
  parseData,
} from './day06';

const input = [
  'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];

describe('day06PartOne', () => {
  test.each([
    { data: input[0], expected: 7 },
    { data: input[1], expected: 5 },
    { data: input[2], expected: 6 },
    { data: input[3], expected: 10 },
    { data: input[4], expected: 11 },
  ])(
    'detects the character after the start-of-packet marker for $data',
    ({ data, expected }) => {
      expect(getIndexAfterStartOfPacket(parseData(data))).toEqual(expected);
    }
  );
});

describe('day06PartTwo', () => {
  test.each([
    { data: input[0], expected: 19 },
    { data: input[1], expected: 23 },
    { data: input[2], expected: 23 },
    { data: input[3], expected: 29 },
    { data: input[4], expected: 26 },
  ])(
    'detects the character after the start-of-message marker for $data',
    ({ data, expected }) => {
      expect(getIndexAfterStartOfMessage(parseData(data))).toEqual(expected);
    }
  );
});
