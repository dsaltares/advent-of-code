import { readFileSync } from 'fs';

export const day18PartOne = () => countLightsAfterSteps(readGrid(), 100);

export const day18PartTwo = () =>
  countLightsAfterStepsBrokenLights(readGrid(), 100);

const readGrid = () =>
  parseGrid(readFileSync('./data/2015/day18.txt', 'utf-8'));

export const parseGrid = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split('').map((char) => char === '#'));

export const countLightsAfterSteps = (grid: boolean[][], steps: number) =>
  countLightsAfterStepsBase(grid, steps, updateLightPartOne);

export const countLightsAfterStepsBrokenLights = (
  grid: boolean[][],
  steps: number
) => {
  getCorners(grid).map(([x, y]) => (grid[y][x] = true));
  return countLightsAfterStepsBase(grid, steps, updateLightPartTwo);
};

const countLightsAfterStepsBase = (
  grid: boolean[][],
  steps: number,
  updateFn: UpdateLightFn
) =>
  countLights(
    Array.from(Array(steps)).reduce(
      (current) => animate(current, updateFn),
      grid
    )
  );

const countLights = (grid: boolean[][]) =>
  grid.reduce((total, row) => total + row.filter((light) => light).length, 0);

const animate = (grid: boolean[][], updateFn: UpdateLightFn) =>
  grid.map((row, y) => row.map((_, x) => updateFn(grid, x, y)));

const countNeighbors = (grid: boolean[][], x: number, y: number) => {
  const height = grid.length;
  const width = grid[0].length;
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter(
    ([nx, ny]) =>
      nx >= 0 && nx < width && ny >= 0 && ny < height && grid[ny][nx]
  ).length;
};

const updateLightPartOne = (grid: boolean[][], x: number, y: number) => {
  const light = grid[y][x];
  const count = countNeighbors(grid, x, y);
  return light ? count === 2 || count === 3 : count === 3;
};

const updateLightPartTwo = (grid: boolean[][], x: number, y: number) => {
  const isCorner = getCorners(grid).some(([cx, cy]) => cx === x && cy === y);
  if (isCorner) {
    return true;
  }
  return updateLightPartOne(grid, x, y);
};

const getCorners = (grid: boolean[][]) => {
  const height = grid.length;
  const width = grid[0].length;
  return [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
};

type UpdateLightFn = (grid: boolean[][], x: number, y: number) => boolean;
