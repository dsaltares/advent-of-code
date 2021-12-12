import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

const readOctopuses = () =>
  readFileSync('./data/2021/day11.txt', 'utf8')
    .split('\n')
    .filter((line) => !!line)
    .map((row) => row.split('').map((value) => parseInt(value, 10)));

type Coordinates = {
  rowIdx: number;
  colIdx: number;
};

const generateAdjacentCoords = (
  coords: Coordinates,
  height: number,
  width: number
) =>
  [
    { rowIdx: coords.rowIdx - 1, colIdx: coords.colIdx - 1 },
    { rowIdx: coords.rowIdx - 1, colIdx: coords.colIdx },
    { rowIdx: coords.rowIdx - 1, colIdx: coords.colIdx + 1 },
    { rowIdx: coords.rowIdx, colIdx: coords.colIdx + 1 },
    { rowIdx: coords.rowIdx + 1, colIdx: coords.colIdx + 1 },
    { rowIdx: coords.rowIdx + 1, colIdx: coords.colIdx },
    { rowIdx: coords.rowIdx + 1, colIdx: coords.colIdx - 1 },
    { rowIdx: coords.rowIdx, colIdx: coords.colIdx - 1 },
  ].filter(
    (adjacent) =>
      adjacent.colIdx >= 0 &&
      adjacent.colIdx < width &&
      adjacent.rowIdx >= 0 &&
      adjacent.rowIdx < height
  );

export const stepOctopuses = (octopuses: number[][]) => {
  const height = octopuses.length;
  const width = octopuses[0].length;
  const updated = cloneDeep(octopuses);

  const flashedCoords: Coordinates[] = [];

  // Increase energy of every octopus
  for (let rowIdx = 0; rowIdx < height; ++rowIdx) {
    for (let colIdx = 0; colIdx < width; ++colIdx) {
      updated[rowIdx][colIdx] += 1;
      if (updated[rowIdx][colIdx] === 10) {
        flashedCoords.push({ rowIdx, colIdx });
      }
    }
  }

  // After flash, increase energy of adjacent octopuses
  while (flashedCoords.length > 0) {
    const coords = flashedCoords.pop() as Coordinates;
    const adjacent = generateAdjacentCoords(coords, height, width);
    adjacent.forEach((current) => {
      const value = updated[current.rowIdx][current.colIdx] + 1;
      if (value === 10) {
        flashedCoords.push({
          rowIdx: current.rowIdx,
          colIdx: current.colIdx,
        });
      }

      updated[current.rowIdx][current.colIdx] = Math.min(value, 10);
    });
  }

  // Reset energy of flashed octopuses to 0
  for (let rowIdx = 0; rowIdx < height; ++rowIdx) {
    for (let colIdx = 0; colIdx < width; ++colIdx) {
      if (updated[rowIdx][colIdx] > 9) {
        updated[rowIdx][colIdx] = 0;
      }
    }
  }

  return updated;
};

const countFlashes = (octopuses: number[][]) => {
  const height = octopuses.length;
  const width = octopuses[0].length;

  let count = 0;
  for (let rowIdx = 0; rowIdx < height; ++rowIdx) {
    for (let colIdx = 0; colIdx < width; ++colIdx) {
      if (octopuses[rowIdx][colIdx] === 0) {
        count++;
      }
    }
  }

  return count;
};

const countFlashesAfterSteps = (octopuses: number[][], steps: number) => {
  let flashes = 0;
  let updated = octopuses;
  for (let step = 0; step < steps; ++step) {
    updated = stepOctopuses(updated);
    flashes += countFlashes(updated);
  }
  return flashes;
};

const day11 = () => {
  const octopuses = readOctopuses();
  return countFlashesAfterSteps(octopuses, 100);
};

export default day11;
