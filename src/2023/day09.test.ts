import {
  extrapolateValueRight,
  extrapolateValueLeft,
  parseReport,
  sumExtrapolatedValuesRight,
  sumExtrapolatedValuesLeft,
} from './day09';

describe('extrapolateValueRight', () => {
  test.each([
    { history: [0, 3, 6, 9, 12, 15], expected: 18 },
    { history: [1, 3, 6, 10, 15, 21], expected: 28 },
    { history: [10, 13, 16, 21, 30, 45], expected: 68 },
  ])(`returns the extrapolated value for $history`, ({ history, expected }) => {
    expect(extrapolateValueRight(history)).toEqual(expected);
  });
});

describe('extrapolateValueLeft', () => {
  test.each([
    { history: [0, 3, 6, 9, 12, 15], expected: -3 },
    { history: [1, 3, 6, 10, 15, 21], expected: 0 },
    { history: [10, 13, 16, 21, 30, 45], expected: 5 },
  ])(
    `returns the extrapolated value on the left for $history`,
    ({ history, expected }) => {
      expect(extrapolateValueLeft(history)).toEqual(expected);
    }
  );
});

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

describe('day09PartOne', () => {
  it('sums the extrapolated values of each report', () => {
    const report = parseReport(input);
    const sum = sumExtrapolatedValuesRight(report);
    expect(sum).toEqual(114);
  });
});

describe('day09PartTwo', () => {
  it('sums the extrapolated values on the left of each report', () => {
    const report = parseReport(input);
    const sum = sumExtrapolatedValuesLeft(report);
    expect(sum).toEqual(2);
  });
});
