import { readFileSync } from 'fs';

export const day12PartOne = () => getStepCount(readHeightMap());

export const day12PartTwo = () =>
  getMinStepCountFromLowestHeight(readHeightMap());

const readHeightMap = () =>
  parseHeightMap(readFileSync('./data/2022/day12.txt', 'utf-8'));

export const parseHeightMap = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(''));

export const getStepCount = (grid: string[][]) =>
  getStepCountBase(grid, find(grid, 'S'));

export const getMinStepCountFromLowestHeight = (grid: string[][]) => {
  const lowestPoints: Position[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (getHeight(grid, [x, y]) === 'a') {
        lowestPoints.push([x, y]);
      }
    }
  }

  const minDistances = lowestPoints.map((point) =>
    getStepCountBase(grid, point)
  );
  return Math.min(...minDistances);
};

const getStepCountBase = (grid: string[][], start: Position) => {
  const height = grid.length;
  const width = grid[0].length;
  const goal = find(grid, 'E');
  const queue: Position[] = [start];
  const distances: Record<string, number> = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      distances[toKey([x, y])] = Infinity;
    }
  }
  distances[toKey(start)] = 0;

  while (queue.length > 0) {
    const position = queue.pop() as Position;
    getNeighbors(grid, position).forEach((neighbor) => {
      const newDistance = distances[toKey(position)] + 1;
      if (newDistance < distances[toKey(neighbor)]) {
        distances[toKey(neighbor)] = newDistance;
        queue.push(neighbor);
        queue.sort(
          (first, second) => distances[toKey(second)] - distances[toKey(first)]
        );
      }
    });
  }

  return distances[toKey(goal)];
};

const find = (grid: string[][], value: string): Position => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === value) {
        return [x, y];
      }
    }
  }
  return [-1, -1];
};

const toKey = (position: Position) => `${position[0]},${position[1]}`;

const getNeighbors = (grid: string[][], position: Position) => {
  const height = grid.length;
  const width = grid[0].length;
  return [
    [position[0] - 1, position[1]],
    [position[0], position[1] - 1],
    [position[0] + 1, position[1]],
    [position[0], position[1] + 1],
  ].filter(([x, y]) => {
    const withinRange = x >= 0 && x < width && y >= 0 && y < height;
    if (!withinRange) {
      return false;
    }
    const heightAtPos = getHeight(grid, position);
    const heightAtNeighbor = getHeight(grid, [x, y]);
    return heightAtPos.charCodeAt(0) - heightAtNeighbor.charCodeAt(0) >= -1;
  }) as Position[];
};

const getHeight = (grid: string[][], [x, y]: Position) => {
  const char = grid[y][x];
  if (char === 'S') {
    return 'a';
  }
  if (char === 'E') {
    return 'z';
  }
  return char;
};

type Position = [number, number];
