import { readFileSync } from 'fs';

export const day11PartOne = () => getMonkeyBusiness(readMonkeys());

export const day11PartTwo = () => getMonkeyBusinessNoRelief(readMonkeys());

const readMonkeys = () =>
  parseMonkeys(readFileSync('./data/2022/day11.txt', 'utf-8'));

export const parseMonkeys = (input: string) => {
  const monkeys: Monkey[] = [];
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);
  for (let i = 0; i < lines.length; i += 6) {
    const [operator, operand] = lines[i + 2]
      .replace('Operation: new = old ', '')
      .split(' ');
    monkeys.push({
      items: lines[i + 1]
        .replace('Starting items: ', '')
        .split(', ')
        .map((item) => parseInt(item, 10)),
      operation: {
        operator: operator as Operator,
        operand: operand !== 'old' ? parseInt(operand, 10) : 'old',
      },
      action: {
        divisibleBy: parseInt(
          lines[i + 3].replace('Test: divisible by ', ''),
          10
        ),
        ifTrue: parseInt(
          lines[i + 4].replace('If true: throw to monkey ', ''),
          10
        ),
        ifFalse: parseInt(
          lines[i + 5].replace('If false: throw to monkey ', ''),
          10
        ),
      },
    });
  }
  return monkeys;
};

export const getMonkeyBusiness = (monkeys: Monkey[]) =>
  getMonkeyBusinessBase(monkeys, 20, (worry) => Math.floor(worry / 3));

export const getMonkeyBusinessNoRelief = (monkeys: Monkey[]) => {
  const divisibleByAll = monkeys.reduce(
    (total, { action: { divisibleBy } }) => total * divisibleBy,
    1
  );
  return getMonkeyBusinessBase(
    monkeys,
    10000,
    (worry) => worry % divisibleByAll
  );
};

const getMonkeyBusinessBase = (
  monkeys: Monkey[],
  rounds: number,
  manageWorryFn: (worry: number) => number
) => {
  const inspectionCounts = Array.from(Array(monkeys.length)).map(() => 0);
  Array.from(Array(rounds)).forEach(() => {
    monkeys.forEach((monkey, index) => {
      while (monkey.items.length > 0) {
        const item = monkey.items.shift() as number;
        const operand =
          monkey.operation.operand === 'old' ? item : monkey.operation.operand;
        const newItem = manageWorryFn(
          monkey.operation.operator === '+' ? item + operand : item * operand
        );
        inspectionCounts[index]++;
        const newMonkeyIndex =
          newItem % monkey.action.divisibleBy === 0
            ? monkey.action.ifTrue
            : monkey.action.ifFalse;
        monkeys[newMonkeyIndex].items.push(newItem);
      }
    });
  });
  return inspectionCounts
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((total, count) => total * count, 1);
};

type Monkey = {
  items: number[];
  operation: Operation;
  action: Action;
};

type Operation = {
  operator: Operator;
  operand: 'old' | number;
};

type Operator = '+' | '*';

type Action = {
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
};
