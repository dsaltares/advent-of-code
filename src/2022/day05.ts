import { readFileSync } from 'fs';

export const day05PartOne = () => {
  const data = readCrateData();
  return getTopCratesUsingCrane9000(data);
};

export const day05PartTwo = () => {
  const data = readCrateData();
  return getTopCratesUsingCrane9001(data);
};

const readCrateData = () =>
  parseCrateData(readFileSync('./data/2022/day05.txt', 'utf-8'));

export const parseCrateData = (input: string): CrateData => {
  const data: CrateData = {
    stacks: [],
    moves: [],
  };

  let numberOfStacks = 0;
  input
    .split('\n')
    .filter((line) => !!line)
    .forEach((line, index) => {
      if (index === 0) {
        numberOfStacks = (line.length + 1) / 4;
        data.stacks = Array.from(Array(numberOfStacks)).map(() => []);
      }
      const moveMatches = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
      const stackIndexesMatches = line.match(/^([ ]*[0-9]+[ ]*)+$/g);
      if (moveMatches) {
        data.moves.push({
          from: parseInt(moveMatches[2], 10) - 1,
          to: parseInt(moveMatches[3], 10) - 1,
          quantity: parseInt(moveMatches[1], 10),
        });
      } else if (!stackIndexesMatches) {
        for (let i = 0; i < numberOfStacks; i++) {
          const value = line[i * 4 + 1];
          if (value != ' ') {
            data.stacks[i].push(value);
          }
        }
      }
    });

  data.stacks.forEach((stack) => stack.reverse());

  return data;
};

export const getTopCratesUsingCrane9000 = (data: CrateData) =>
  getTopCratesAfterCraneMoves(data, crane9000Move);

export const getTopCratesUsingCrane9001 = (data: CrateData) =>
  getTopCratesAfterCraneMoves(data, crane9001Move);

const getTopCratesAfterCraneMoves = (data: CrateData, moveFn: CraneMoveFn) => {
  const stacks = data.stacks.map((stack) => [...stack]);
  data.moves.forEach((move) => moveFn(move, stacks));
  return stacks.map((stack) => stack[stack.length - 1]).join('');
};

const crane9000Move: CraneMoveFn = (move, stacks) => {
  Array.from(Array(move.quantity)).forEach(() => {
    const crate = stacks[move.from].pop();
    if (crate) {
      stacks[move.to].push(crate);
    }
  });
};

const crane9001Move: CraneMoveFn = (move, stacks) => {
  stacks[move.to].push(
    ...stacks[move.from].splice(
      stacks[move.from].length - move.quantity,
      move.quantity
    )
  );
};

type CrateData = {
  stacks: string[][];
  moves: Move[];
};

type Move = {
  quantity: number;
  from: number;
  to: number;
};

type CraneMoveFn = (move: Move, stacks: string[][]) => void;
