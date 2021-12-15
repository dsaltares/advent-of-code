import { readFileSync } from 'fs';
import minBy from 'lodash.minby';

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
  const toVisit = new Set<number>();
  nodes.forEach((node, idx) => {
    distances[idx] = Infinity;
    previous[idx] = undefined;
    toVisit.add(idx);
  });

  distances[0] = 0;

  while (toVisit.size > 0) {
    const topIdx = minBy([...toVisit], (idx) => distances[idx]) as number;
    toVisit.delete(topIdx);

    getAdjacentIdx(nodes[topIdx], width, height).forEach((adjacentIdx) => {
      const newDistance = distances[topIdx] + nodes[adjacentIdx].risk;
      if (newDistance < distances[adjacentIdx]) {
        distances[adjacentIdx] = newDistance;
        previous[adjacentIdx] = topIdx;
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

const day15 = () => {
  const map = readMap();
  return getRiskBetweenStartAndFinish(map);
};

export default day15;
