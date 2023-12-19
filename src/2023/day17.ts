import { readFileSync } from 'fs';

export const day17PartOne = () => {
  const map = readMap();
  return getMinHeatLossClumsyCrucible(map);
};

export const day17PartTwo = () => {
  const map = readMap();
  return getMinHeatLossUltraCrucible(map);
};

const readMap = () => parseMap(readFileSync('./data/2023/day17.txt', 'utf-8'));

export const parseMap = (input: string): Map =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split('').map((cell) => parseInt(cell, 10)));

export const getMinHeatLossClumsyCrucible = (map: Map) =>
  getMinHeatLoss(map, 0, 3);
export const getMinHeatLossUltraCrucible = (map: Map) =>
  getMinHeatLoss(map, 4, 10);

const getMinHeatLoss = (
  map: Map,
  minStraightDistance: number,
  maxStraightDistance: number
) => {
  const height = map.length;
  const width = map[0].length;
  const start = {
    position: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    dirDistance: 1,
    heatLoss: 0,
  };
  const queue: Node[] = [start];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const top = queue.shift()!;
    const key = getNodeKey(top);
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    if (
      top.position.x === width - 1 &&
      top.position.y === height - 1 &&
      top.dirDistance >= minStraightDistance
    ) {
      return top.heatLoss;
    }

    getAdjacent(
      top,
      map,
      visited,
      minStraightDistance,
      maxStraightDistance
    ).forEach((next) => pushToQueue(queue, next));
  }

  return 0;
};

const getNodeKey = (node: Node) =>
  JSON.stringify({
    position: node.position,
    direction: node.direction,
    dirDistance: node.dirDistance,
  });

const getAdjacent = (
  node: Node,
  map: Map,
  visited: Set<string>,
  minStraightDistance: number,
  maxStraightDistance: number
) => {
  if (node.direction.x === 0 && node.direction.y === 0) {
    // Initial position. Can only move right or down.
    return [
      {
        position: { x: node.position.x + 1, y: node.position.y },
        direction: { x: 1, y: 0 },
        dirDistance: 1,
        heatLoss: map[node.position.y][node.position.x + 1],
      },
      {
        position: { x: node.position.x, y: node.position.y + 1 },
        direction: { x: 0, y: 1 },
        dirDistance: 1,
        heatLoss: map[node.position.y + 1][node.position.x],
      },
    ];
  }

  const candidates: Node[] = [];

  // Move forward
  if (node.dirDistance < maxStraightDistance) {
    const position = {
      x: node.position.x + node.direction.x,
      y: node.position.y + node.direction.y,
    };
    if (withinBounds(position, map)) {
      candidates.push({
        position,
        direction: { ...node.direction },
        dirDistance: node.dirDistance + 1,
        heatLoss: node.heatLoss + map[position.y][position.x],
      });
    }
  }

  // Turn left
  const positionLeft = {
    x: node.position.x - node.direction.y,
    y: node.position.y + node.direction.x,
  };
  if (
    node.dirDistance >= minStraightDistance &&
    withinBounds(positionLeft, map)
  ) {
    candidates.push({
      position: positionLeft,
      direction: {
        x: -node.direction.y,
        y: node.direction.x,
      },
      dirDistance: 1,
      heatLoss: node.heatLoss + map[positionLeft.y][positionLeft.x],
    });
  }

  // Turn right
  const positionRight = {
    x: node.position.x + node.direction.y,
    y: node.position.y - node.direction.x,
  };
  if (
    node.dirDistance >= minStraightDistance &&
    withinBounds(positionRight, map)
  ) {
    candidates.push({
      position: positionRight,
      direction: {
        x: node.direction.y,
        y: -node.direction.x,
      },
      dirDistance: 1,
      heatLoss: node.heatLoss + map[positionRight.y][positionRight.x],
    });
  }

  return candidates.filter((candidate) => !visited.has(getNodeKey(candidate)));
};

const withinBounds = (position: Vector2, map: Map) => {
  const height = map.length;
  const width = map[0].length;
  return (
    position.x >= 0 &&
    position.x < width &&
    position.y >= 0 &&
    position.y < height
  );
};

const pushToQueue = (queue: Node[], node: Node) => {
  for (let i = queue.length - 1; 0 <= i; i--) {
    if (queue[i].heatLoss <= node.heatLoss) {
      queue.splice(i + 1, 0, node);
      return;
    }
  }
  if (queue.length === 0) {
    queue.push(node);
    return;
  }
  queue.unshift(node);
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
  heatLoss: number;
};
