import { readFileSync } from 'fs';

type Node = {
  x: number;
  y: number;
  risk: number;
};

const toIdx = (x: number, y: number, width: number) => y * width + x;

const readMap = () =>
  readFileSync('./data/2021/day15.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => line.split('').map((number) => parseInt(number, 10)));

const getAdjacentIdx = (node: Node, width: number, height: number) =>
  [
    { x: node.x - 1, y: node.y },
    { x: node.x, y: node.y + 1 },
    { x: node.x + 1, y: node.y },
    { x: node.x, y: node.y - 1 },
  ]
    .filter(({ x, y }) => x >= 0 && x < width && y >= 0 && y < height)
    .map(({ x, y }) => toIdx(x, y, width));

const dijkstra = (map: number[][]) => {
  const height = map.length;
  const width = map[0].length;

  const nodes: Node[] = [];

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      nodes.push({ x, y, risk: map[y][x] });
    }
  }

  const distances: Record<number, number> = {};
  const previous: Record<number, number | undefined> = {};
  const queue: number[] = [];
  nodes.forEach((_, idx) => {
    distances[idx] = Infinity;
    previous[idx] = undefined;
  });

  distances[0] = 0;
  queue.push(0);

  while (queue.length > 0) {
    const topIdx = queue.pop() as number;

    getAdjacentIdx(nodes[topIdx], width, height).forEach((adjacentIdx) => {
      const newDistance = distances[topIdx] + nodes[adjacentIdx].risk;
      if (newDistance < distances[adjacentIdx]) {
        distances[adjacentIdx] = newDistance;
        previous[adjacentIdx] = topIdx;
        queue.push(adjacentIdx);
        queue.sort(
          (firstIdx, secondIdx) => distances[secondIdx] - distances[firstIdx]
        );
      }
    });
  }

  return {
    distances,
    previous,
    nodes,
  };
};

export const getRiskBetweenStartAndFinish = (map: number[][]) => {
  const result = dijkstra(map);
  return result.distances[result.nodes.length - 1];
};

const wrap = (x: number, lowerBound: number, upperBound: number) => {
  const rangeSize = upperBound - lowerBound + 1;
  return lowerBound + ((x - lowerBound) % rangeSize);
};

export const expandMap = (map: number[][]) => {
  const height = map.length;
  const width = map[0].length;
  const factor = 5;

  const newMap: number[][] = Array.from(Array(height * factor)).map(() =>
    Array.from(Array(width * factor).fill(0))
  );
  for (let x = 0; x < width * factor; ++x) {
    for (let y = 0; y < height * factor; ++y) {
      const riskAddition = Math.floor(x / width) + Math.floor(y / height);
      const originalRisk = map[y % height][x % width];
      const newRisk = wrap(originalRisk + riskAddition, 1, 9);
      newMap[y][x] = newRisk;
    }
  }

  return newMap;
};

const day15 = () => {
  const map = readMap();
  return getRiskBetweenStartAndFinish(map);
};

export const day15PartTwo = () => {
  const map = readMap();
  const expandedMap = expandMap(map);
  return getRiskBetweenStartAndFinish(expandedMap);
};

export default day15;
