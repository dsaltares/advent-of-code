import {
  magnitude,
  split,
  add,
  addNumbers,
  largestMagnitudeSumAnyTwo,
  SnailNumber,
} from './day18';

describe('magnitude', () => {
  const cases = [
    {
      number: [9, 1],
      magnitude: 29,
    },
    {
      number: [1, 9],
      magnitude: 21,
    },
    {
      number: [
        [9, 1],
        [1, 9],
      ],
      magnitude: 129,
    },
    {
      number: [
        [1, 2],
        [[3, 4], 5],
      ],
      magnitude: 143,
    },
    {
      number: [
        [
          [[0, 7], 4],
          [
            [7, 8],
            [6, 0],
          ],
        ],
        [8, 1],
      ],
      magnitude: 1384,
    },
    {
      number: [
        [
          [
            [1, 1],
            [2, 2],
          ],
          [3, 3],
        ],
        [4, 4],
      ],
      magnitude: 445,
    },
    {
      number: [
        [
          [
            [3, 0],
            [5, 3],
          ],
          [4, 4],
        ],
        [5, 5],
      ],
      magnitude: 791,
    },
    {
      number: [
        [
          [
            [5, 0],
            [7, 4],
          ],
          [5, 5],
        ],
        [6, 6],
      ],
      magnitude: 1137,
    },
    {
      number: [
        [
          [
            [8, 7],
            [7, 7],
          ],
          [
            [8, 6],
            [7, 7],
          ],
        ],
        [
          [
            [0, 7],
            [6, 6],
          ],
          [8, 7],
        ],
      ],
      magnitude: 3488,
    },
  ];

  cases.forEach((testCase) => {
    test(`correctly calculates the magnitude for ${JSON.stringify(
      testCase.number
    )}`, () => {
      expect(magnitude(testCase.number)).toEqual(testCase.magnitude);
    });
  });
});

describe('split', () => {
  const cases = [
    {
      before: 10,
      after: [5, 5],
    },
    {
      before: 11,
      after: [5, 6],
    },
    {
      before: 12,
      after: [6, 6],
    },
    {
      before: [
        [
          [[0, 7], 4],
          [15, [0, 13]],
        ],
        [1, 1],
      ],
      after: [
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, 13],
          ],
        ],
        [1, 1],
      ],
    },
  ];

  cases.forEach((testCase) => {
    test(`returns split number for ${JSON.stringify(testCase.before)}`, () => {
      expect(split(testCase.before).element).toEqual(testCase.after);
    });
  });
});

describe('add', () => {
  const cases = [
    {
      first: '[[[[4,3],4],4],[7,[[8,4],9]]]',
      second: '[1, 1]',
      expected: '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
    },
    {
      first: '[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]',
      second: '[[[5,[7,4]],7],1]',
      expected: '[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]',
    },
  ];

  cases.forEach((testCase) => {
    test(`returns correct result for ${testCase.first} + ${testCase.second}`, () => {
      const first = JSON.parse(testCase.first);
      const second = JSON.parse(testCase.second);
      const result = add(first, second);
      expect(JSON.stringify(result)).toEqual(testCase.expected);
    });
  });
});

describe('addNumbers', () => {
  it('returns correct sum for sample input', () => {
    const numbers = [
      '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
      '[[[5,[2,8]],4],[5,[[9,9],0]]]',
      '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
      '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
      '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
      '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
      '[[[[5,4],[7,7]],8],[[8,3],8]]',
      '[[9,3],[[9,9],[6,[4,9]]]]',
      '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
      '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]',
    ].map((number) => JSON.parse(number) as SnailNumber);
    const result = addNumbers(numbers);

    expect(JSON.stringify(result)).toEqual(
      '[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]'
    );
  });
});

describe('largestMagnitudeSumAnyTwo', () => {
  it('returns correct largest magnitude for the sum of any of the sample numbers', () => {
    const numbers = [
      '[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
      '[[[5,[2,8]],4],[5,[[9,9],0]]]',
      '[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
      '[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
      '[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
      '[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
      '[[[[5,4],[7,7]],8],[[8,3],8]]',
      '[[9,3],[[9,9],[6,[4,9]]]]',
      '[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
      '[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]',
    ].map((number) => JSON.parse(number) as SnailNumber);
    const result = largestMagnitudeSumAnyTwo(numbers);

    expect(result).toEqual(3993);
  });
});
