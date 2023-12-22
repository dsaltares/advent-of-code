import { getVisitedPlotsAfterSteps, parseMap } from './day21';

const input = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`;

describe('day21PartOne', () => {
  test.each([
    { steps: 1, expected: 2 },
    { steps: 2, expected: 4 },
    { steps: 3, expected: 6 },
    { steps: 6, expected: 16 },
  ])(
    'returns the number of visited plots after $input steps',
    ({ steps, expected }) => {
      const map = parseMap(input);
      const infinite = false;
      const visited = getVisitedPlotsAfterSteps(map, steps, infinite);
      expect(visited).toEqual(expected);
    }
  );
});
