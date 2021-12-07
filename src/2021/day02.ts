import { readFileSync } from 'fs';

type Direction = 'forward' | 'up' | 'down';

export type Command = {
  direction: Direction;
  amount: number;
};

type Position = {
  horizontal: number;
  depth: number;
  aim: number;
};

const getCommands = (): Command[] =>
  readFileSync('./data/2021/day02.txt', 'utf8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => {
      const [direction, amount] = line.split(' ');
      return {
        direction: direction as Direction,
        amount: parseInt(amount, 10),
      };
    });

type CommandResolver = (position: Position, command: Command) => Position;

export const applyCommand: CommandResolver = (
  position: Position,
  command: Command
) => {
  const newPosition: Position = { ...position };
  if (command.direction === 'forward') {
    newPosition.horizontal += command.amount;
  } else if (command.direction === 'down') {
    newPosition.depth += command.amount;
  } else if (command.direction === 'up') {
    newPosition.depth -= command.amount;
  }

  return newPosition;
};

export const applyCommandWithAim: CommandResolver = (
  position: Position,
  command: Command
) => {
  const newPosition: Position = { ...position };
  if (command.direction === 'forward') {
    newPosition.horizontal += command.amount;
    newPosition.depth += newPosition.aim * command.amount;
  } else if (command.direction === 'down') {
    newPosition.aim += command.amount;
  } else if (command.direction === 'up') {
    newPosition.aim -= command.amount;
  }

  return newPosition;
};

export const getPositionAfterCommands = (
  commands: Command[],
  applyCommand: CommandResolver
) =>
  commands.reduce(applyCommand, {
    horizontal: 0,
    depth: 0,
    aim: 0,
  } as Position);

const day02 = () => {
  const commands = getCommands();
  const position = getPositionAfterCommands(commands, applyCommand);
  return position.horizontal * position.depth;
};

export const day02PartTwo = () => {
  const commands = getCommands();
  const position = getPositionAfterCommands(commands, applyCommandWithAim);
  return position.horizontal * position.depth;
};

export default day02;
