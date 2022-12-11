import {
  countLightsAfterSteps,
  countLightsAfterStepsBrokenLights,
  parseGrid,
} from './day18';

const input = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`;

describe('day18PartOne', () => {
  it('returns the number of lights that are on after 4 steps', () => {
    expect(countLightsAfterSteps(parseGrid(input), 4)).toEqual(4);
  });
});

describe('day18PartTwo', () => {
  it('returns the number of lights that are on after 5 steps with broken lights', () => {
    expect(countLightsAfterStepsBrokenLights(parseGrid(input), 5)).toEqual(17);
  });
});
