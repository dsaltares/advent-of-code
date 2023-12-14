import {
  getKey,
  getLoadAfterOneBillionSpinCycles,
  getLoadAfterTiltingNorth,
  parseMap,
  spinCycle,
} from './day14';

const input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

describe('day14PartOne', () => {
  it('returns the load after tilting north', () => {
    const map = parseMap(input);
    const load = getLoadAfterTiltingNorth(map);
    expect(load).toEqual(136);
  });
});

describe('spinCycle', () => {
  it('executes one spin cycle correctly', () => {
    const map = parseMap(input);
    spinCycle(map);
    const key = getKey(map);
    expect(key).toEqual(`.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`);
  });

  it('executes two spin cycle correctly', () => {
    const map = parseMap(input);
    spinCycle(map);
    spinCycle(map);
    const key = getKey(map);
    expect(key).toEqual(`.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`);
  });
});

describe('day14PartTwo', () => {
  it('returns the load after running 1B spinning cycles', () => {
    const map = parseMap(input);
    const load = getLoadAfterOneBillionSpinCycles(map);
    expect(load).toEqual(64);
  });
});
