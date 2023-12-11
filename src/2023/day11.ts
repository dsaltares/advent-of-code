import { readFileSync } from 'fs';

type Universe = string[][];
type Position = {
  row: number;
  col: number;
};

export const day11PartOne = () => {
  const universe = readUniverse();
  return expandAndSumDistancesBetweenGalaxies(universe);
};

export const day11PartTwo = () => {
  const universe = readUniverse();
  return expandAndSumDistancesBetweenGalaxies(universe, 1000000);
};

const readUniverse = () =>
  parseUniverse(readFileSync('./data/2023/day11.txt', 'utf-8'));

export const parseUniverse = (input: string): Universe =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.replace('.', '1').split(''));

export const expandAndSumDistancesBetweenGalaxies = (
  universe: Universe,
  expandFactor: number = 2
) => {
  const emptyRowIndices = getEmptyRowIndices(universe);
  const emptyColumnIndices = getEmptyColumnIndices(universe);
  const galaxies = findGalaxies(universe);
  let sum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    const galaxyA = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyB = galaxies[j];
      const distanceX = Math.abs(galaxyA.col - galaxyB.col);
      const bigGapsX = Array.from(Array(distanceX))
        .map((_, idx) => idx + Math.min(galaxyA.col, galaxyB.col))
        .filter((colIdx) => emptyColumnIndices.has(colIdx)).length;
      const distanceY = Math.abs(galaxyA.row - galaxyB.row);
      const bigGapsY = Array.from(Array(distanceY))
        .map((_, idx) => idx + Math.min(galaxyA.row, galaxyB.row))
        .filter((rowIdx) => emptyRowIndices.has(rowIdx)).length;

      sum +=
        distanceX +
        distanceY +
        bigGapsX * (expandFactor - 1) +
        bigGapsY * (expandFactor - 1);
    }
  }

  return sum;
};

const getEmptyRowIndices = (universe: Universe) => {
  const emptyRowIndices = new Set<number>();
  for (let rowIdx = 0; rowIdx < universe.length; rowIdx++) {
    const row = universe[rowIdx];
    if (allEmpty(row)) {
      emptyRowIndices.add(rowIdx);
    }
  }

  return emptyRowIndices;
};

const getEmptyColumnIndices = (universe: Universe) => {
  const emptyColumnIndices = new Set<number>();
  for (let colIdx = 0; colIdx < universe.length; colIdx++) {
    const column = universe.map((row) => row[colIdx]);
    if (allEmpty(column)) {
      emptyColumnIndices.add(colIdx);
    }
  }

  return emptyColumnIndices;
};

const findGalaxies = (universe: Universe) => {
  const height = universe.length;
  const width = universe[0].length;
  const positions: Position[] = [];
  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      if (universe[rowIdx][colIdx] === '#') {
        positions.push({ row: rowIdx, col: colIdx });
      }
    }
  }

  return positions;
};

const allEmpty = (tiles: string[]) => tiles.every((tile) => tile !== '#');
