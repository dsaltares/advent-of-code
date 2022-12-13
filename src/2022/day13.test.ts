import {
  getDecoderKey,
  inOrder,
  parsePacketPairs,
  sumNumbersOfInOrderPacketPairs,
} from './day13';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('day13PartOne', () => {
  it('returns the sum of the pair numbers of the packet pairs that are in order', () => {
    expect(sumNumbersOfInOrderPacketPairs(parsePacketPairs(input))).toEqual(13);
  });
});

describe('day13PartTwo', () => {
  it('returns the decoder key for the packets', () => {
    expect(getDecoderKey(parsePacketPairs(input))).toEqual(140);
  });
});

describe('inOrder', () => {
  test.each([
    { left: [1, 1, 3, 1, 1], right: [1, 1, 5, 1, 1], expected: true },
    { left: [[1], [2, 3, 4]], right: [[1], 4], expected: true },
    { left: [9], right: [[8, 7, 6]], expected: false },
    { left: [[4, 4], 4, 4], right: [[4, 4], 4, 4, 4], expected: true },
    { left: [7, 7, 7, 7], right: [7, 7, 7], expected: false },
    { left: [], right: [3], expected: true },
    { left: [[[]]], right: [[]], expected: false },
    {
      left: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      right: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
      expected: false,
    },
  ])(
    '$left and $right are in order - $expected',
    ({ left, right, expected }) => {
      expect(inOrder([left, right])).toEqual(expected);
    }
  );
});
