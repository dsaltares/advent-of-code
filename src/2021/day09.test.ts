import { getLowPoints, getRiskLevelSum } from './day09';

describe('getLowPoints', () => {
  it('returns list of low points for the sample heightmap', () => {
    const heightmap = [
      [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
      [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
      [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
      [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
      [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
    ];
    const lowPoints = getLowPoints(heightmap);

    expect(lowPoints).toEqual([1, 0, 5, 5]);
  });
});

describe('getRiskLevelSum', () => {
  it('returns correct risk level sum for sample low points', () => {
    const lowPoints = [1, 0, 5, 5];
    const riskLevel = getRiskLevelSum(lowPoints);

    expect(riskLevel).toEqual(15);
  });
});
