import { readFileSync } from 'fs';

type Map = string[][];

export const day14PartOne = () => {
  const map = readMap();
  return getLoadAfterTiltingNorth(map);
};

export const day14PartTwo = () => {
  const map = readMap();
  return getLoadAfterOneBillionSpinCycles(map);
};

const readMap = () => parseMap(readFileSync('./data/2023/day14.txt', 'utf-8'));

export const parseMap = (input: string): Map =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(''));

export const getLoadAfterTiltingNorth = (map: Map) =>
  calculateLoad(tiltNorth(map));

export const getLoadAfterOneBillionSpinCycles = (map: Map) => {
  const numCycles = 1000000000;
  const snapshots = new Map<string, number>();
  for (let cycleIdx = 0; cycleIdx < numCycles; cycleIdx++) {
    const key = getKey(map);
    if (snapshots.has(key) && cycleIdx) {
      const prevCycleStart = snapshots.get(key)!;
      const cycleLength = cycleIdx - prevCycleStart;
      const remainingCycles = numCycles - cycleIdx;
      const cycleOffset = remainingCycles % cycleLength;

      for (const [key, snapshotIdx] of snapshots.entries()) {
        if (snapshotIdx === prevCycleStart + cycleOffset) {
          return calculateLoad(parseMap(key));
        }
      }
    }
    spinCycle(map);
    snapshots.set(key, cycleIdx);
  }
  return 0;
};

export const getKey = (map: Map) => map.map((row) => row.join('')).join('\n');

export const spinCycle = (map: Map) => {
  tiltNorth(map);
  tiltWest(map);
  tiltSouth(map);
  tiltEast(map);
};

const tiltNorth = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      const cell = map[rowIdx][colIdx];
      if (cell === 'O') {
        slideNorth(map, rowIdx, colIdx);
      }
    }
  }

  return map;
};
const tiltWest = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      const cell = map[rowIdx][colIdx];
      if (cell === 'O') {
        slideWest(map, rowIdx, colIdx);
      }
    }
  }

  return map;
};
const tiltSouth = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  for (let rowIdx = height - 1; rowIdx >= 0; rowIdx--) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      const cell = map[rowIdx][colIdx];
      if (cell === 'O') {
        slideSouth(map, rowIdx, colIdx);
      }
    }
  }

  return map;
};
const tiltEast = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    for (let colIdx = width - 1; colIdx >= 0; colIdx--) {
      const cell = map[rowIdx][colIdx];
      if (cell === 'O') {
        slideEast(map, rowIdx, colIdx);
      }
    }
  }

  return map;
};

const slideNorth = (map: Map, startRowIdx: number, startColIdx: number) => {
  for (let rowIdx = startRowIdx - 1; rowIdx >= 0; rowIdx--) {
    const cell = map[rowIdx][startColIdx];
    const prev = map[rowIdx + 1][startColIdx];
    if (prev === 'O' && cell === '.') {
      map[rowIdx][startColIdx] = prev;
      map[rowIdx + 1][startColIdx] = '.';
    }
  }
};

const slideWest = (map: Map, startRowIdx: number, startColIdx: number) => {
  for (let colIdx = startColIdx - 1; colIdx >= 0; colIdx--) {
    const cell = map[startRowIdx][colIdx];
    const prev = map[startRowIdx][colIdx + 1];
    if (prev === 'O' && cell === '.') {
      map[startRowIdx][colIdx] = prev;
      map[startRowIdx][colIdx + 1] = '.';
    }
  }
};

const slideSouth = (map: Map, startRowIdx: number, startColIdx: number) => {
  const height = map.length;
  for (let rowIdx = startRowIdx + 1; rowIdx < height; rowIdx++) {
    const cell = map[rowIdx][startColIdx];
    const prev = map[rowIdx - 1][startColIdx];
    if (prev === 'O' && cell === '.') {
      map[rowIdx][startColIdx] = prev;
      map[rowIdx - 1][startColIdx] = '.';
    }
  }
};

const slideEast = (map: Map, startRowIdx: number, startColIdx: number) => {
  const width = map[0].length;
  for (let colIdx = startColIdx + 1; colIdx < width; colIdx++) {
    const cell = map[startRowIdx][colIdx];
    const prev = map[startRowIdx][colIdx - 1];
    if (prev === 'O' && cell === '.') {
      map[startRowIdx][colIdx] = prev;
      map[startRowIdx][colIdx - 1] = '.';
    }
  }
};

const calculateLoad = (map: Map) =>
  map.reduce(
    (rowAcc, row, rowIndex) =>
      rowAcc +
      row.reduce((acc, cell) => {
        if (cell !== 'O') {
          return acc;
        }
        return acc + map.length - rowIndex;
      }, 0),
    0
  );
