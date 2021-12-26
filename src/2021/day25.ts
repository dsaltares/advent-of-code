import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';

type Cell = 'v' | '>' | '.';
export type Map = Cell[][];

export const createMap = (data: string) =>
  data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line)
    .map((line) => line.split('')) as Map;

const readMap = (): Map =>
  createMap(readFileSync('./data/2021/day25.txt', 'utf-8'));

export const toDisplay = (map: Map) =>
  map.map((row) => row.join('')).join('\n');

export const getTarget = (map: Map, x: number, y: number) => {
  const width = map[0].length;
  const height = map.length;
  const cell = map[y][x];
  let target = [x, y];
  if (cell == '>') {
    target = [x + 1, y];
  } else if (cell == 'v') {
    target = [x, y + 1];
  }

  return [target[0] % width, target[1] % height];
};

const stepCellType = (map: Map, cellType: Cell) => {
  const updated = cloneDeep(map);
  const width = map[0].length;
  const height = map.length;

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      const cell = map[y][x];
      if (cell !== cellType) {
        continue;
      }
      const [targetX, targetY] = getTarget(map, x, y);
      if (map[targetY][targetX] !== '.') {
        continue;
      }
      updated[y][x] = '.';
      updated[targetY][targetX] = cell;
    }
  }

  return updated;
};

export const step = (map: Map) => {
  let updated = stepCellType(map, '>');
  updated = stepCellType(updated, 'v');
  return updated;
};

export const stepsUntilStable = (map: Map) => {
  let steps = 0;
  let current = map;
  let next = map;
  do {
    steps++;
    current = next;
    next = step(current);
  } while (!isEqual(next, current));
  return steps;
};

const day25 = () => {
  const map = readMap();
  return stepsUntilStable(map);
};

export default day25;
