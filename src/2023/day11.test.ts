import { expandAndSumDistancesBetweenGalaxies, parseUniverse } from './day11';

const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

describe('day11PartOne', () => {
  it('returns the sum of distances between all galaxies in the expanded universe', () => {
    const universe = parseUniverse(input);
    const sum = expandAndSumDistancesBetweenGalaxies(universe);
    expect(sum).toEqual(374);
  });
});

describe('day11PartOne', () => {
  it('returns the sum of distances between all galaxies with an expanded universe with factor 10', () => {
    const universe = parseUniverse(input);
    const sum = expandAndSumDistancesBetweenGalaxies(universe, 10);
    expect(sum).toEqual(1030);
  });

  it('returns the sum of distances between all galaxies with an expanded universe with factor 100', () => {
    const universe = parseUniverse(input);
    const sum = expandAndSumDistancesBetweenGalaxies(universe, 100);
    expect(sum).toEqual(8410);
  });
});
