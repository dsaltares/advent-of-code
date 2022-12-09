import { readFileSync } from 'fs';

export const day09PartOne = () =>
  countPositionsVisitedByTailTwoSegments(readMotions());

export const day09PartTwo = () =>
  countPositionsVisitedByTailTenSegments(readMotions());

const readMotions = () =>
  parseMotions(readFileSync('data/2022/day09.txt', 'utf8'));

export const parseMotions = (input: string): Motion[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const [direction, steps] = line.split(' ');
      return {
        direction: direction as Direction,
        steps: parseInt(steps, 10),
      };
    });

export const countPositionsVisitedByTailTwoSegments = (motions: Motion[]) =>
  countPositionsVisitedByTail(motions, 2);

export const countPositionsVisitedByTailTenSegments = (motions: Motion[]) =>
  countPositionsVisitedByTail(motions, 10);

const countPositionsVisitedByTail = (
  motions: Motion[],
  numSegments: number
) => {
  const segments = Array.from(Array(numSegments)).map(() => [0, 0] as Position);
  const visited = new Set<string>([positionKey(segments[segments.length - 1])]);

  motions.forEach(({ direction, steps }) =>
    Array.from(Array(steps)).forEach(() => {
      const head = segments[0];
      switch (direction) {
        case 'U':
          head[1] += 1;
          break;
        case 'D':
          head[1] -= 1;
          break;
        case 'L':
          head[0] -= 1;
          break;
        case 'R':
          head[0] += 1;
          break;
      }

      segments.slice(1).forEach((tail, index) => {
        const previous = segments[index];
        followHead(previous, tail);
      });

      visited.add(positionKey(segments[segments.length - 1]));
    })
  );

  return visited.size;
};

const positionKey = (position: number[]) => position.join(',');

const followHead = (head: Position, tail: Position) => {
  const xDiff = Math.abs(head[0] - tail[0]);
  const xSign = Math.sign(head[0] - tail[0]);
  const yDiff = Math.abs(head[1] - tail[1]);
  const ySign = Math.sign(head[1] - tail[1]);

  if (xDiff > 1 || (xDiff === 1 && yDiff > 1)) {
    tail[0] += xSign;
  }

  if (yDiff > 1 || (yDiff === 1 && xDiff > 1)) {
    tail[1] += ySign;
  }
};

type Motion = {
  direction: Direction;
  steps: number;
};

type Direction = 'U' | 'D' | 'L' | 'R';

type Position = [number, number];
