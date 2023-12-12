import {
  getPossibleArrangements,
  parseConditionReport,
  sumPossibleArrangements,
  unfold,
} from './day12';

describe('getPosibleArrangements', () => {
  test.each([
    {
      conditions: '???.###',
      groups: [1, 1, 3],
      expected: 1,
    },
    {
      conditions: '.??..??...?##.',
      groups: [1, 1, 3],
      expected: 4,
    },
    {
      conditions: '?#?#?#?#?#?#?#?',
      groups: [1, 3, 1, 6],
      expected: 1,
    },
    {
      conditions: '????.#...#...',
      groups: [4, 1, 1],
      expected: 1,
    },
    {
      conditions: '????.######..#####.',
      groups: [1, 6, 5],
      expected: 4,
    },
    {
      conditions: '?###????????',
      groups: [3, 2, 1],
      expected: 10,
    },
  ])(
    `returns the number of possible arrangements - $conditions`,
    ({ conditions, groups, expected }) => {
      expect(
        getPossibleArrangements(
          {
            conditions,
            groups,
          },
          new Map<string, number>()
        )
      ).toEqual(expected);
    }
  );
});

const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

describe('day12PartOne', () => {
  it('returns the number of possible arrangements', () => {
    const report = parseConditionReport(input);
    const arrangements = sumPossibleArrangements(report);
    expect(arrangements).toEqual(21);
  });
});

describe('day12PartTwo', () => {
  it('returns the number of possible arrangements in the unfolded report', () => {
    const report = unfold(parseConditionReport(input));
    const arrangements = sumPossibleArrangements(report);
    expect(arrangements).toEqual(525152);
  });
});
