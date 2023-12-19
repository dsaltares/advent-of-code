import {
  getLavaCapacityPartOne,
  getLavaCapacityPartTwo,
  parseDigPlan,
} from './day18';

const input = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

describe('day18PartOne', () => {
  it('returns the lava capacity', () => {
    const digPlan = parseDigPlan(input);
    const capacity = getLavaCapacityPartOne(digPlan);
    expect(capacity).toEqual(62);
  });
});

describe('day18PartTwo', () => {
  it('returns the lava capacity using hex instructions', () => {
    const digPlan = parseDigPlan(input);
    const capacity = getLavaCapacityPartTwo(digPlan);
    expect(capacity).toEqual(952408144115);
  });
});
