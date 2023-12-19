import {
  getMinHeatLossClumsyCrucible,
  getMinHeatLossUltraCrucible,
  parseMap,
} from './day17';

const input = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

describe('day17PartOne', () => {
  it('returns the minimum heat loss for a clumsy crucible', () => {
    const map = parseMap(input);
    const loss = getMinHeatLossClumsyCrucible(map);
    expect(loss).toEqual(102);
  });
});

describe('day17PartTwo', () => {
  it('returns the minimum heat loss for an ultra crucible', () => {
    const map = parseMap(input);
    const loss = getMinHeatLossUltraCrucible(map);
    expect(loss).toEqual(94);
  });
});
