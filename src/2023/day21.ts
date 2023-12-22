import { readFileSync } from 'fs';
export const day21PartOne = () => {
  const map = readMap();
  return getVisitedPlotsAfter64Steps(map);
};

export const day21PartTwo = () => {
  const map = readMap();
  return getVisitedPlotsAfterManyStepsInfiniteMap(map);
};

const readMap = () => parseMap(readFileSync('./data/2023/day21.txt', 'utf-8'));

export const parseMap = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(''));

export const getVisitedPlotsAfter64Steps = (map: Map) =>
  getVisitedPlotsAfterSteps(map, 64, false);

export const getVisitedPlotsAfterManyStepsInfiniteMap = (map: Map) => {
  // https://github.com/MarianBe/AdventOfCode/blob/main/src/2023/21.ts#L91
  // The pattern is starting_pos + map_width * i
  // https://www.dcode.fr/newton-interpolating-polynomial
  const start = getStart(map);
  const width = map[0].length;
  // for (let i = 0; i < 3; i++) {
  //   const infinite = true;
  //   const visited = getVisitedPlotsAfterSteps(
  //     map,
  //     start.x + width * i,
  //     infinite
  //   );
  //   console.log('i:', i, 'visited:', visited);
  // }
  const steps = 26501365;
  const x = (steps - start.x) / width;
  return (14275 * Math.pow(x, 2)) / 2 + (28629 * x) / 2 + 3606;
};

export const getVisitedPlotsAfterSteps = (
  map: Map,
  steps: number,
  infinite: boolean
) => {
  const final = new Set<string>();
  const queue = new Set<string>();
  const start = {
    position: getStart(map),
    steps: 0,
  };
  queue.add(getKey(start));

  while (queue.size > 0) {
    const nodeKey = queue.values().next().value;
    const node = fromKey(nodeKey);
    queue.delete(nodeKey);

    if (node.steps === steps) {
      final.add(nodeKey);
    }

    getAdjacent(node, map, steps, infinite).forEach((next) =>
      queue.add(getKey(next))
    );
  }

  return final.size;
};

const getStart = (map: Map): Position => {
  const height = map.length;
  const width = map[0].length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] === Start) {
        return { x, y };
      }
    }
  }
  throw new Error('Start not found');
};

const getAdjacent = (
  node: Node,
  map: Map,
  steps: number,
  infinite: boolean
) => {
  const height = map.length;
  const width = map[0].length;
  return [
    {
      position: { x: node.position.x - 1, y: node.position.y },
      steps: node.steps + 1,
    },
    {
      position: { x: node.position.x + 1, y: node.position.y },
      steps: node.steps + 1,
    },
    {
      position: { x: node.position.x, y: node.position.y - 1 },
      steps: node.steps + 1,
    },
    {
      position: { x: node.position.x, y: node.position.y + 1 },
      steps: node.steps + 1,
    },
  ].filter((candidate) => {
    const x = infinite
      ? candidate.position.x % width < 0
        ? width + (candidate.position.x % width)
        : candidate.position.x % width
      : candidate.position.x;
    const y = infinite
      ? candidate.position.y % height < candidate.position.y % height
        ? height + (candidate.position.y % height)
        : candidate.position.y % height
      : candidate.position.y;
    return (
      x >= 0 &&
      x < width &&
      y >= 0 &&
      y < height &&
      map[y][x] !== Rock &&
      candidate.steps <= steps
    );
  });
};

const getKey = (node: Node) => JSON.stringify(node);
const fromKey = (key: string) => JSON.parse(key) as Node;

const Start = 'S';
const Rock = '#';

type Map = string[][];
type Position = { x: number; y: number };
type Node = {
  position: Position;
  steps: number;
};
