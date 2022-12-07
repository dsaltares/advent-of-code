import { readFileSync } from 'fs';

export const day06PartOne = () =>
  countLightsAfterInstructions(readInstructions());

export const day06PartTwo = () =>
  countLightsAfterCorrectInstructions(readInstructions());

const readInstructions = () =>
  parseInstructions(readFileSync('data/2015/day06.txt', 'utf-8'));

export const parseInstructions = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .map((line) => {
      const matches =
        /(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/g.exec(
          line
        );
      if (matches) {
        return {
          cmd: matches[1],
          start: [parseInt(matches[2], 10), parseInt(matches[3], 10)],
          end: [parseInt(matches[4], 10), parseInt(matches[5], 10)],
        } as Instruction;
      }
    })
    .filter((line) => !!line) as Instruction[];

export const countLightsAfterInstructions = (instructions: Instruction[]) => {
  const grid: boolean[][] = Array.from(Array(1000)).map(() =>
    Array.from(Array(1000)).fill(false)
  );

  instructions.forEach(({ cmd, start: [x1, y1], end: [x2, y2] }) => {
    for (let x = x1; x <= x2; ++x) {
      for (let y = y1; y <= y2; ++y) {
        switch (cmd) {
          case 'toggle':
            grid[x][y] = !grid[x][y];
            break;
          case 'turn on':
            grid[x][y] = true;
            break;
          case 'turn off':
            grid[x][y] = false;
            break;
        }
      }
    }
  });

  return grid.reduce(
    (total, row) =>
      total + row.reduce((acc, value) => (value ? acc + 1 : acc), 0),
    0
  );
};

export const countLightsAfterCorrectInstructions = (
  instructions: Instruction[]
) => {
  const grid: number[][] = Array.from(Array(1000)).map(() =>
    Array.from(Array(1000)).fill(0)
  );

  instructions.forEach(({ cmd, start: [x1, y1], end: [x2, y2] }) => {
    for (let x = x1; x <= x2; ++x) {
      for (let y = y1; y <= y2; ++y) {
        switch (cmd) {
          case 'toggle':
            grid[x][y] += 2;
            break;
          case 'turn on':
            grid[x][y] += 1;
            break;
          case 'turn off':
            grid[x][y] = Math.max(0, grid[x][y] - 1);
            break;
        }
      }
    }
  });

  return grid.reduce(
    (total, row) => total + row.reduce((acc, value) => acc + value, 0),
    0
  );
};

type Instruction = {
  cmd: 'turn on' | 'turn off' | 'toggle';
  start: [number, number];
  end: [number, number];
};
