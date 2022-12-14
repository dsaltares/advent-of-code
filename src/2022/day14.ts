/* eslint-disable no-constant-condition */
import { readFileSync } from 'fs';

export const day14PartOne = () => getSandCapacityNoFloor(readCaveMap());

export const day14PartTwo = () => getSandCapacityFloor(readCaveMap());

const readCaveMap = () =>
  parseCaveMap(readFileSync('./data/2022/day14.txt', 'utf-8'));

export const parseCaveMap = (input: string) => {
  const rockLines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) =>
      line
        .split(' -> ')
        .map(
          (position) =>
            position.split(',').map((point) => parseInt(point, 10)) as Position
        )
    );

  const maxX = Math.max(
    ...rockLines.map((segments) =>
      Math.max(...segments.map((segment) => segment[0]))
    )
  );
  const maxY = Math.max(
    ...rockLines.map((segments) =>
      Math.max(...segments.map((segment) => segment[1]))
    )
  );

  const rocks = new Set<string>();
  rockLines.forEach((segments) =>
    segments.slice(0, -1).forEach((point, idx) => {
      const next = segments[idx + 1];
      const xStart = Math.min(point[0], next[0]);
      const yStart = Math.min(point[1], next[1]);
      const xDiff = Math.abs(point[0] - next[0]);
      const yDiff = Math.abs(point[1] - next[1]);
      for (let x = xStart; x <= xStart + xDiff; x++) {
        for (let y = yStart; y <= yStart + yDiff; y++) {
          add(rocks, [x, y]);
        }
      }
    })
  );

  return {
    floor: maxY + 2,
    width: maxX + 1,
    height: maxY + 1,
    rocks,
    sand: new Set<string>(),
  };
};

const SandStart: Position = [500, 0];

export const getSandCapacityNoFloor = (cave: Cave) =>
  getSandCapacity(cave, isValidMoveNoFloor, inMapNoFloor);

export const getSandCapacityFloor = (cave: Cave) =>
  getSandCapacity(cave, isValidMoveFloor, inMapFloor);

const getSandCapacity = (
  cave: Cave,
  isValidMove: EvaluatePositionFn,
  isInMap: EvaluatePositionFn
) => {
  let capacity = 0;

  while (true) {
    if (dropSand(cave, isValidMove, isInMap)) {
      capacity++;
    } else {
      return capacity;
    }
  }
};

const dropSand = (
  cave: Cave,
  isValidMove: EvaluatePositionFn,
  isInMap: EvaluatePositionFn
) => {
  if (has(cave.sand, SandStart)) {
    return false;
  }

  let position = [...SandStart] as Position;
  while (true) {
    const moves = generateMoves(cave, position, isValidMove);
    if (moves.length === 0) {
      add(cave.sand, position);
      return true;
    }
    const target = moves[0];
    if (!isInMap(cave, target)) {
      return false;
    }
    position = target;
  }
};

const generateMoves = (
  cave: Cave,
  [x, y]: Position,
  isValidMove: EvaluatePositionFn
) =>
  (
    [
      [x, y + 1],
      [x - 1, y + 1],
      [x + 1, y + 1],
    ] as Position[]
  ).filter((pos) => isValidMove(cave, pos));

const toKey = ([x, y]: Position) => `${x},${y}`;
const has = (set: Set<string>, pos: Position) => set.has(toKey(pos));
const add = (set: Set<string>, pos: Position) => set.add(toKey(pos));

const isValidMoveFloor: EvaluatePositionFn = (cave, [x, y]) =>
  y < cave.floor && !has(cave.sand, [x, y]) && !has(cave.rocks, [x, y]);

const inMapFloor: EvaluatePositionFn = () => true;

const isValidMoveNoFloor: EvaluatePositionFn = (cave, pos) =>
  !inMapNoFloor(cave, pos) || (!has(cave.rocks, pos) && !has(cave.sand, pos));

const inMapNoFloor: EvaluatePositionFn = ({ width, height }, [x, y]) =>
  x >= 0 && x < width && y >= 0 && y < height;

type Position = [number, number];

type Cave = {
  floor: number;
  height: number;
  width: number;
  rocks: Set<string>;
  sand: Set<string>;
};

type EvaluatePositionFn = (cave: Cave, position: Position) => boolean;
