import { parseSchematic, sumGearRatios, sumPartNumbers } from './day03';

const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

describe('day03PartOne', () => {
  it('returns the sum of the part numbers', () => {
    const schematic = parseSchematic(input);
    const sum = sumPartNumbers(schematic);
    expect(sum).toEqual(4361);
  });
});

describe('day03PartOne', () => {
  it('returns the sum of the gear ratios', () => {
    const schematic = parseSchematic(input);
    const sum = sumGearRatios(schematic);
    expect(sum).toEqual(467835);
  });
});
