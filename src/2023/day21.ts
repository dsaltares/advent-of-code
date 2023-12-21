import { readFileSync } from 'fs';
export const day21PartOne = () => {
  const map = readMap();
  return getVisitedPlotsAfter64Steps(map);
};

export const day21PartTwo = () => {
  return 0;
};

const readMap = () => parseMap(readFileSync('./data/2023/day21.txt', 'utf-8'));

export const parseMap = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(''));

export const getVisitedPlotsAfter64Steps = (map: Map) =>
  getVisitedPlotsAfterSteps(map, 64);

export const getVisitedPlotsAfterSteps = (map: Map, steps: number) => {
  const start = {
    position: getStart(map),
    steps: 0,
  };
  const queue: Node[] = [start];
  const seen = new Set<string>();
  const processed: Node[] = [];

  while (queue.length > 0) {
    const top = queue.shift()!;
    const topKey = getKey(top);
    if (seen.has(topKey)) {
      continue;
    }
    seen.add(getKey(top));
    processed.push(top);
    queue.push(...getAdjacent(top, map, steps));
  }

  const visited = new Set(
    processed.filter((node) => node.steps === steps).map(getKey)
  );

  return visited.size;
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

const getAdjacent = (node: Node, map: Map, steps: number) => {
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
  ].filter(
    (candidate) =>
      candidate.position.x >= 0 &&
      candidate.position.x < width &&
      candidate.position.y >= 0 &&
      candidate.position.y < height &&
      map[candidate.position.y][candidate.position.x] !== Rock &&
      candidate.steps <= steps
  );
};

const getKey = (node: Node) =>
  `${node.position.x},${node.position.y},${node.steps}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const drawMap = (map: Map, visited: Set<string>) => {
  const height = map.length;
  const width = map[0].length;
  const lines: string[] = [];
  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      if (visited.has(key)) {
        line += 'O';
      } else {
        line += map[y][x];
      }
    }
    lines.push(line);
  }

  console.log('\n' + lines.join('\n'));
};

const Start = 'S';
const Rock = '#';

type Map = string[][];
type Position = { x: number; y: number };
type Node = {
  position: Position;
  steps: number;
};
