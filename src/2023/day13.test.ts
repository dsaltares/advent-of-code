import {
  parsePatterns,
  sumPatternNotes,
  sumPatternNotesWithSmudges,
} from './day13';

const input = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

describe('day13PartOne', () => {
  it('returns the sum of the pattern notes summary', () => {
    const patterns = parsePatterns(input);
    const sum = sumPatternNotes(patterns);
    expect(sum).toEqual(405);
  });
});

describe('day13PartTwo', () => {
  it('returns the sum of the pattern notes summary cleaning one smudge', () => {
    const patterns = parsePatterns(input);
    const sum = sumPatternNotesWithSmudges(patterns);
    expect(sum).toEqual(400);
  });
});
