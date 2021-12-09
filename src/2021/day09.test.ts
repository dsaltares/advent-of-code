import {
  getLowPoints,
  getRiskLevelSum,
  getBasinSizes,
  getMultipliedTopThreeBasinSizes,
} from './day09';

const heightmap = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

describe('getLowPoints', () => {
  it('returns list of low points for the sample heightmap', () => {
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

describe('getBasinSizes', () => {
  it('returns correct basin sizes for sample heightmap', () => {
    const basinSizes = getBasinSizes(heightmap);

    expect(basinSizes).toEqual([3, 9, 14, 9]);
  });
});

describe('getMultipliedTopThreeBasinSizes', () => {
  const sizes = [3, 9, 14, 9];
  const result = getMultipliedTopThreeBasinSizes(sizes);

  expect(result).toEqual(1134);
});
