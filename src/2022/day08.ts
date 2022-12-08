import { readFileSync } from 'fs';

export const day08PartOne = () => countVisibleTrees(readHeightMap());

export const day08PartTwo = () => getHighestScenicScore(readHeightMap());

const readHeightMap = () =>
  parseHeightMap(readFileSync('./data/2022/day08.txt', 'utf-8'));

export const parseHeightMap = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split('').map((char) => parseInt(char, 10)));

export const countVisibleTrees = (heightMap: number[][]) => {
  let count = 0;
  const height = heightMap.length;
  const width = heightMap[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (isVisible(heightMap, row, col)) {
        count++;
      }
    }
  }
  return count;
};

export const getHighestScenicScore = (heightMap: number[][]) => {
  let highest = 0;
  const height = heightMap.length;
  const width = heightMap[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const score = getScenicScore(heightMap, row, col);
      if (score > highest) {
        highest = score;
      }
    }
  }
  return highest;
};

const isVisible = (heightMap: number[][], row: number, col: number) => {
  const height = heightMap.length;
  const width = heightMap[0].length;
  const isEdge =
    row === 0 || row === height - 1 || col === 0 || col === width - 1;
  if (isEdge) {
    return true;
  }

  const value = heightMap[row][col];
  const occludedFromNorth = Array.from(Array(row)).some(
    (_, i) => heightMap[row - i - 1][col] >= value
  );
  const occludedFromSouth = Array.from(Array(height - row - 1)).some(
    (_, i) => heightMap[row + i + 1][col] >= value
  );
  const occludedFromWest = Array.from(Array(col)).some(
    (_, i) => heightMap[row][col - i - 1] >= value
  );
  const occludedFromEast = Array.from(Array(width - col - 1)).some(
    (_, i) => heightMap[row][col + i + 1] >= value
  );
  return (
    !occludedFromNorth ||
    !occludedFromSouth ||
    !occludedFromWest ||
    !occludedFromEast
  );
};

const getScenicScore = (heightMap: number[][], row: number, col: number) => {
  const height = heightMap.length;
  const width = heightMap[0].length;
  const isEdge =
    row === 0 || row === height - 1 || col === 0 || col === width - 1;
  if (isEdge) {
    return 0;
  }

  const value = heightMap[row][col];
  const occludedIndexNorth = Array.from(Array(row)).findIndex(
    (_v, i) => heightMap[row - i - 1][col] >= value
  );
  const visibleNorth = occludedIndexNorth >= 0 ? occludedIndexNorth + 1 : row;
  const occludedIndexSouth = Array.from(Array(height - row - 1)).findIndex(
    (_, i) => heightMap[row + i + 1][col] >= value
  );
  const visibleSouth =
    occludedIndexSouth >= 0 ? occludedIndexSouth + 1 : height - row - 1;
  const occludedIndexWest = Array.from(Array(col)).findIndex(
    (_, i) => heightMap[row][col - i - 1] >= value
  );
  const visibleWest = occludedIndexWest >= 0 ? occludedIndexWest + 1 : col;
  const occludedIndexEast = Array.from(Array(width - col - 1)).findIndex(
    (_, i) => heightMap[row][col + i + 1] >= value
  );
  const visibleEast =
    occludedIndexEast >= 0 ? occludedIndexEast + 1 : width - col - 1;

  return visibleNorth * visibleSouth * visibleWest * visibleEast;
};
