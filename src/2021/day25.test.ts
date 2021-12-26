import { createMap, step, stepsUntilStable, Map } from './day25';

describe('step', () => {
  it('moves in 1D', () => {
    const map: Map = [['.', '.', '.', '>', '>', '>', '>', '>', '.', '.', '.']];

    let updated = step(map);
    expect(updated).toEqual([
      ['.', '.', '.', '>', '>', '>', '>', '.', '>', '.', '.'],
    ]);

    updated = step(updated);
    expect(updated).toEqual([
      ['.', '.', '.', '>', '>', '>', '.', '>', '.', '>', '.'],
    ]);
  });

  it('moves east facing first, then south facing', () => {
    const map: Map = [
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '>', 'v', '.', '.', '.', '.', 'v', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '>', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    const updated = step(map);
    expect(updated).toEqual([
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '>', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', 'v', '.', '.', '.', '.', 'v', '>', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ]);
  });
});

describe('stepsUntilStable', () => {
  it('returns correct number of steps until stable for sample map', () => {
    const data = `
      v...>>.vv>
      .vv>>.vv..
      >>.>v>...v
      >>v>>.>.v.
      v>v.vv.v..
      >.>>..v...
      .vv..>.>v.
      v.v..>>v.v
      ....v..v.>
    `;
    const map = createMap(data);
    const steps = stepsUntilStable(map);
    expect(steps).toEqual(58);
  });
});
