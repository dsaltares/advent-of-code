import { readFileSync } from 'fs';
import chunk from 'lodash.chunk';

export const day03PartOne = () => {
  const backpacks = readBackpacks();
  const misplaced = getMisplacedItems(backpacks);
  return getPrioritySum(misplaced);
};

export const day03PartTwo = () => {
  const backpacks = readBackpacks();
  const badges = getBadges(backpacks);
  return getPrioritySum(badges);
};

const readBackpacks = () =>
  parseBackpacks(readFileSync('./data/2022/day03.txt', 'utf-8'));

export const parseBackpacks = (input: string) =>
  input.split('\n').filter((line) => !!line.trimEnd().trimStart());

const breakInTwo = (line: string) => {
  const mid = line.length / 2;
  return [line.slice(0, mid), line.slice(mid)];
};

export const getMisplacedItems = (backpacks: string[]) =>
  backpacks.map((backpack) => {
    const [first, second] = breakInTwo(backpack);
    const secondSet = new Set(second.split(''));
    for (const item of first) {
      if (secondSet.has(item)) {
        return item;
      }
    }
  }) as string[];

export const getPrioritySum = (items: string[]) =>
  items.map(getItemPriority).reduce((total, priority) => total + priority, 0);

export const getBadges = (backpacks: string[]) => {
  const groups = chunk(backpacks, 3);
  return groups.map(([first, second, third]) => {
    const secondSet = new Set(second.split(''));
    const thirdSet = new Set(third.split(''));
    for (const item of first) {
      if (secondSet.has(item) && thirdSet.has(item)) {
        return item;
      }
    }
  }) as string[];
};

const getItemPriority = (item: string) =>
  item === item.toUpperCase()
    ? item.charCodeAt(0) - 38
    : item.charCodeAt(0) - 96;
