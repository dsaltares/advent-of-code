import { readFileSync } from 'fs';

const readHeightmap = () =>
  readFileSync('./data/2021/day09.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => line.split('').map((value) => parseInt(value, 10)));

export const getLowPoints = (heightmap: number[][]) => {
  const height = heightmap.length;
  const width = heightmap[0].length;

  const lowPoints: number[] = [];
  for (let rowIdx = 0; rowIdx < height; ++rowIdx) {
    for (let colIdx = 0; colIdx < width; ++colIdx) {
      const value = heightmap[rowIdx][colIdx];
      const northHeight = rowIdx > 0 ? heightmap[rowIdx - 1][colIdx] : Infinity;
      const southHeight =
        rowIdx < height - 1 ? heightmap[rowIdx + 1][colIdx] : Infinity;
      const westHeight = colIdx > 0 ? heightmap[rowIdx][colIdx - 1] : Infinity;
      const eastHeight =
        colIdx < width - 1 ? heightmap[rowIdx][colIdx + 1] : Infinity;

      const isLowPoint =
        value < northHeight &&
        value < southHeight &&
        value < westHeight &&
        value < eastHeight;

      if (isLowPoint) {
        lowPoints.push(value);
      }
    }
  }

  return lowPoints;
};

const getRiskLevel = (height: number) => height + 1;

export const getRiskLevelSum = (points: number[]) =>
  points.reduce((sum, height) => sum + getRiskLevel(height), 0);

const day09 = () => {
  const heightmap = readHeightmap();
  const lowPoints = getLowPoints(heightmap);
  return getRiskLevelSum(lowPoints);
};

export default day09;
