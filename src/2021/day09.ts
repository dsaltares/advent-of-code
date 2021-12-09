import { readFileSync } from 'fs';

const readHeightmap = () =>
  readFileSync('./data/2021/day09.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => line.split('').map((value) => parseInt(value, 10)));

const isLowPoint = (heightmap: number[][], rowIdx: number, colIdx: number) => {
  const height = heightmap.length;
  const width = heightmap[0].length;

  const value = heightmap[rowIdx][colIdx];
  const northHeight = rowIdx > 0 ? heightmap[rowIdx - 1][colIdx] : Infinity;
  const southHeight =
    rowIdx < height - 1 ? heightmap[rowIdx + 1][colIdx] : Infinity;
  const westHeight = colIdx > 0 ? heightmap[rowIdx][colIdx - 1] : Infinity;
  const eastHeight =
    colIdx < width - 1 ? heightmap[rowIdx][colIdx + 1] : Infinity;

  return (
    value < northHeight &&
    value < southHeight &&
    value < westHeight &&
    value < eastHeight
  );
};

type Location = {
  row: number;
  col: number;
};

export const getLowPointLocations = (heightmap: number[][]) => {
  const height = heightmap.length;
  const width = heightmap[0].length;

  const locations: Location[] = [];

  for (let rowIdx = 0; rowIdx < height; ++rowIdx) {
    for (let colIdx = 0; colIdx < width; ++colIdx) {
      if (isLowPoint(heightmap, rowIdx, colIdx)) {
        locations.push({ row: rowIdx, col: colIdx });
      }
    }
  }

  return locations;
};

export const getLowPoints = (heightmap: number[][]) =>
  getLowPointLocations(heightmap).map(
    (location) => heightmap[location.row][location.col]
  );

const getRiskLevel = (height: number) => height + 1;

export const getRiskLevelSum = (points: number[]) =>
  points.reduce((sum, height) => sum + getRiskLevel(height), 0);

const getBasinSize = (heightmap: number[][], location: Location) => {
  const height = heightmap.length;
  const width = heightmap[0].length;
  const queue: Location[] = [location];
  const visited = new Set<string>();
  let basinSize = 0;

  while (queue.length > 0) {
    const current = queue.pop() as Location;

    const isOutside =
      current.row < 0 ||
      current.row >= height ||
      current.col < 0 ||
      current.col >= width;

    if (isOutside) {
      continue;
    }

    const isPeak = heightmap[current.row][current.col] === 9;

    const locationKey = `${current.row}:${current.col}`;
    const isVisited = visited.has(locationKey);

    if (isPeak || isVisited) {
      continue;
    }

    basinSize += 1;
    visited.add(locationKey);

    queue.push({ row: current.row + 1, col: current.col });
    queue.push({ row: current.row - 1, col: current.col });
    queue.push({ row: current.row, col: current.col + 1 });
    queue.push({ row: current.row, col: current.col - 1 });
  }

  return basinSize;
};

export const getBasinSizes = (heightmap: number[][]): number[] =>
  getLowPointLocations(heightmap).map((location) =>
    getBasinSize(heightmap, location)
  );

export const getMultipliedTopThreeBasinSizes = (sizes: number[]) =>
  [...sizes]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1);

const day09 = () => {
  const heightmap = readHeightmap();
  const lowPoints = getLowPoints(heightmap);
  return getRiskLevelSum(lowPoints);
};

export const day09PartTwo = () => {
  const heightmap = readHeightmap();
  const basinSizes = getBasinSizes(heightmap);
  return getMultipliedTopThreeBasinSizes(basinSizes);
};

export default day09;
