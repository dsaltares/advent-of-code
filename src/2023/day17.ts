import { readFileSync } from 'fs';

export const day17PartOne = () => {
  const map = readMap();
  return getMinHeatLoss(map);
};

export const day17PartTwo = () => {
  return 0;
};

const readMap = () => parseMap(readFileSync('./data/2023/day17.txt', 'utf-8'));

export const parseMap = (input: string): Map =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split('').map((cell) => parseInt(cell, 10)));

export const getMinHeatLoss = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  const distances: number[][] = Array.from(Array(height)).map(() =>
    Array.from(Array(width)).fill(Infinity)
  );
  const previous: (Vector2 | undefined)[][] = Array.from(Array(height)).map(
    () => Array.from(Array(width)).fill(undefined)
  );
  const start = {
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    dirDistance: 1,
  };
  const queue: Node[] = [start];
  const visited = new Set<string>();

  distances[0][0] = 0;

  while (queue.length > 0) {
    const top = queue.pop()!;
    const key = getNodeKey(top);
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    getAdjacent(top, map, visited).forEach((next) => {
      const newDistance =
        distances[top.position.y][top.position.x] +
        map[next.position.y][next.position.x];
      if (newDistance < distances[next.position.y][next.position.x]) {
        distances[next.position.y][next.position.x] = newDistance;
        previous[next.position.y][next.position.x] = { ...top.position };
        queue.push(next);
        queue.sort(
          (first, second) =>
            distances[second.position.y][second.position.x] -
            distances[first.position.y][first.position.x]
        );
      }
    });
  }

  let position = { x: width - 1, y: height - 1 };
  const path: Vector2[] = [position];
  while (previous[position.y][position.x] !== undefined) {
    position = previous[position.y][position.x]!;
    path.push({ ...position });
  }
  const nodePath = path.reverse();
  console.log(nodePath);

  return distances[height - 1][width - 1];
};

const getNodeKey = (node: Node) => JSON.stringify(node);

const getAdjacent = (node: Node, map: Map, visited: Set<string>) => {
  const candidates: Node[] = [];

  if (node.direction.x === 0 && node.direction.y === 0) {
    // Initial position. Can only move right or down.
    candidates.push(
      ...[
        {
          position: { x: node.position.x + 1, y: node.position.y },
          direction: { x: 1, y: 0 },
          dirDistance: 1,
        },
        {
          position: { x: node.position.x, y: node.position.y + 1 },
          direction: { x: 0, y: 1 },
          dirDistance: 1,
        },
      ]
    );
  } else {
    // Move forward
    if (node.dirDistance < 3) {
      candidates.push({
        position: {
          x: node.position.x + node.direction.x,
          y: node.position.y + node.direction.y,
        },
        direction: { ...node.direction },
        dirDistance: node.dirDistance + 1,
      });
    }

    // Turn left
    candidates.push({
      position: {
        x: node.position.x - node.direction.y,
        y: node.position.y + node.direction.x,
      },
      direction: {
        x: -node.direction.y,
        y: node.direction.x,
      },
      dirDistance: 1,
    });

    // Turn right
    candidates.push({
      position: {
        x: node.position.x + node.direction.y,
        y: node.position.y - node.direction.x,
      },
      direction: {
        x: node.direction.y,
        y: -node.direction.x,
      },
      dirDistance: 1,
    });
  }

  const height = map.length;
  const width = map[0].length;
  return candidates.filter(
    (candidate) =>
      candidate.position.x >= 0 &&
      candidate.position.x < width &&
      candidate.position.y >= 0 &&
      candidate.position.y < height &&
      !visited.has(getNodeKey(candidate))
  );
};

type Map = number[][];
type Vector2 = {
  x: number;
  y: number;
};
type Node = {
  position: Vector2;
  direction: Vector2;
  dirDistance: number;
};
