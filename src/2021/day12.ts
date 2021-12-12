import { readFileSync } from 'fs';

type CaveMap = Record<string, string[]>;

export const createCaves = (data: string) =>
  data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line)
    .reduce((caveMap, line) => {
      const [a, b] = line.split('-');
      return {
        ...caveMap,
        [a]: [...(caveMap[a] || []), b],
        [b]: [...(caveMap[b] || []), a],
      };
    }, {} as CaveMap);

const readCaves = (): CaveMap =>
  createCaves(readFileSync('./data/2021/day12.txt', 'utf-8'));

const isBigCave = (name: string) =>
  name.split('').every((letter) => letter === letter.toUpperCase());

const hasVisited = (path: string[], name: string) => path.indexOf(name) !== -1;

const hasVisitedSmallCaveTwice = (path: string[]) => {
  const small = path.filter((node) => !isBigCave(node));
  const set = new Set(small);
  return small.length > set.size;
};

export const getAllPaths = (
  caveMap: CaveMap,
  allowTwoVisitsToOneSmallCave = false
) => {
  const paths: string[][] = [];

  const pathQueue = [['start']];
  while (pathQueue.length > 0) {
    const path = pathQueue.shift() as string[];
    const last = path[path.length - 1];

    if (last === 'end') {
      paths.push([...path]);
      continue;
    }

    const nodes = caveMap[last] || [];
    nodes.forEach((node) => {
      if (
        node !== 'start' &&
        (isBigCave(node) ||
          !hasVisited(path, node) ||
          (allowTwoVisitsToOneSmallCave && !hasVisitedSmallCaveTwice(path)))
      ) {
        pathQueue.push([...path, node]);
      }
    });
  }

  return paths;
};

const day12 = () => {
  const caveMap = readCaves();
  const paths = getAllPaths(caveMap);
  return paths.length;
};

export const day12PartTwo = () => {
  const caveMap = readCaves();
  const allowTwoVisitsToOneSmallCave = true;
  const paths = getAllPaths(caveMap, allowTwoVisitsToOneSmallCave);
  return paths.length;
};

export default day12;
