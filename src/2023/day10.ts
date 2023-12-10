import { readFileSync } from 'fs';

type Tiles = string[][];
type Position = {
  row: number;
  col: number;
};
type Polygon = Position[];

export const day10PartOne = () => {
  const tiles = readTiles();
  return countStepsToFurthest(tiles);
};

export const day10PartTwo = () => {
  const tiles = readTiles();
  return countTilesInsideLoop(tiles);
};

const readTiles = () =>
  parseTiles(readFileSync('./data/2023/day10.txt', 'utf-8'));

export const parseTiles = (input: string): Tiles =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => line.split(''));

export const countStepsToFurthest = (tiles: Tiles) => {
  const start = findStartingPosition(tiles)!;
  let steps = 1;
  let [posA, posB] = getPositionCandidates(tiles, start);
  let [prevA, prevB] = [start, start];
  while (!areEqual(posA, posB)) {
    steps++;
    const nextA = getNextPosition(tiles, posA, prevA);
    const nextB = getNextPosition(tiles, posB, prevB);
    prevA = posA;
    prevB = posB;
    posA = nextA;
    posB = nextB;
  }
  return steps;
};

const findStartingPosition = (tiles: Tiles) => {
  const height = tiles.length;
  const width = tiles[0].length;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (tiles[row][col] === 'S') {
        return { row, col };
      }
    }
  }
};

const getPositionCandidates = (tiles: Tiles, current: Position) => {
  const tile = tiles[current.row][current.col];
  if (tile === '|') {
    return [
      { row: current.row - 1, col: current.col },
      { row: current.row + 1, col: current.col },
    ];
  }
  if (tile === '-') {
    return [
      { row: current.row, col: current.col - 1 },
      { row: current.row, col: current.col + 1 },
    ];
  }
  if (tile === 'L') {
    return [
      { row: current.row - 1, col: current.col },
      { row: current.row, col: current.col + 1 },
    ];
  }
  if (tile === 'J') {
    return [
      { row: current.row - 1, col: current.col },
      { row: current.row, col: current.col - 1 },
    ];
  }
  if (tile === '7') {
    return [
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col - 1 },
    ];
  }
  if (tile === 'F') {
    return [
      { row: current.row + 1, col: current.col },
      { row: current.row, col: current.col + 1 },
    ];
  }
  if (tile === 'S') {
    const candidates: Position[] = [];

    const north = {
      row: current.row - 1,
      col: current.col,
    };
    const northTile = getTile(tiles, north);
    if (['|', '7', 'F'].includes(northTile)) {
      candidates.push(north);
    }

    const south = {
      row: current.row + 1,
      col: current.col,
    };
    const southTile = getTile(tiles, south);
    if (['|', 'L', 'J'].includes(southTile)) {
      candidates.push(south);
    }

    const east = {
      row: current.row,
      col: current.col + 1,
    };
    const eastTile = getTile(tiles, east);
    if (['-', 'J', '7'].includes(eastTile)) {
      candidates.push(east);
    }

    const west = {
      row: current.row,
      col: current.col - 1,
    };
    const westTile = getTile(tiles, west);
    if (['-', 'L', 'F'].includes(westTile)) {
      candidates.push(west);
    }

    return candidates;
  }

  return [];
};

const getNextPosition = (tiles: Tiles, current: Position, previous: Position) =>
  getPositionCandidates(tiles, current).filter(
    (candidate) => !areEqual(previous, candidate)
  )[0];

const areEqual = (a: Position, b: Position) =>
  a.row === b.row && a.col === b.col;

export const countTilesInsideLoop = (tiles: Tiles) => {
  const loop = findLoop(tiles);
  return countTilesInsidePolygon(tiles, loop);
};

const findLoop = (tiles: Tiles) => {
  const start = findStartingPosition(tiles)!;
  const polygon: Polygon = [start, getPositionCandidates(tiles, start)[0]];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const current = polygon[polygon.length - 1];
    const previous = polygon[polygon.length - 2];
    const next = getNextPosition(tiles, current, previous);
    if (tiles[next.row][next.col] === 'S') {
      return polygon;
    }
    polygon.push(next);
  }
};

const countTilesInsidePolygon = (tiles: Tiles, polygon: Polygon) => {
  let count = 0;
  for (let row = 0; row < tiles.length; row++) {
    for (let col = 0; col < tiles[0].length; col++) {
      if (pointInPolygon({ row, col }, polygon)) {
        count++;
      }
    }
  }
  return count;
};

const pointInPolygon = (point: Position, polygon: Polygon): boolean => {
  const { col: x, row: y } = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].col;
    const yi = polygon[i].row;
    const xj = polygon[j].col;
    const yj = polygon[j].row;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside && polygon.every((p) => !areEqual(p, point));
};

const getTile = (tiles: Tiles, position: Position) => {
  const height = tiles.length;
  const width = tiles[0].length;
  if (position.row < 0 || position.row >= height) {
    return '.';
  }
  if (position.col < 0 || position.col >= width) {
    return '.';
  }
  return tiles[position.row][position.col];
};
