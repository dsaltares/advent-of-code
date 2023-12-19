import { readFileSync } from 'fs';

export const day18PartOne = () => {
  const digPlan = readDigPlan();
  return getLavaCapacityPartOne(digPlan);
};

export const day18PartTwo = () => {
  const digPlan = readDigPlan();
  return getLavaCapacityPartTwo(digPlan);
};

const readDigPlan = () =>
  parseDigPlan(readFileSync('./data/2023/day18.txt', 'utf-8'));

export const parseDigPlan = (input: string): DigPlan =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, direction, distance, color] = line.match(
        /([UDLR]) ([0-9]+) \(#([0-9a-f]{6})\)/
      )!;
      return {
        direction: direction as Direction,
        distance: parseInt(distance, 10),
        color,
      };
    });

export const getLavaCapacityPartOne = (digPlan: DigPlan) =>
  getLavaCapacityBase(digPlan, createPolygonPartOne);

export const getLavaCapacityPartTwo = (digPlan: DigPlan) =>
  getLavaCapacityBase(digPlan, createPolygonPartTwo);

type CreatePolygon = (digPlan: DigPlan) => Polygon;

export const getLavaCapacityBase = (
  digPlan: DigPlan,
  createPolygon: CreatePolygon
) => calculatePolygonArea(createPolygon(digPlan));

const DirectionMap = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const createPolygonPartOne = (digPlan: DigPlan) => {
  const polygon: Polygon = [{ x: 0, y: 0 }];
  digPlan.forEach((instruction) => {
    const lastPoint = polygon[polygon.length - 1];
    const direction = DirectionMap[instruction.direction];
    const nextPoint = {
      x: lastPoint.x + direction.x * instruction.distance,
      y: lastPoint.y + direction.y * instruction.distance,
    };
    polygon.push(nextPoint);
  });
  return polygon;
};

const HexDirectionMap = {
  '3': { x: 0, y: -1 },
  '1': { x: 0, y: 1 },
  '2': { x: -1, y: 0 },
  '0': { x: 1, y: 0 },
};
const createPolygonPartTwo = (digPlan: DigPlan) => {
  const polygon: Polygon = [{ x: 0, y: 0 }];
  digPlan.forEach((instruction) => {
    const lastPoint = polygon[polygon.length - 1];
    const distance = parseInt(instruction.color.substring(0, 5), 16);
    const direction =
      HexDirectionMap[
        instruction.color.substring(5) as keyof typeof HexDirectionMap
      ];
    const nextPoint = {
      x: lastPoint.x + direction.x * distance,
      y: lastPoint.y + direction.y * distance,
    };
    polygon.push(nextPoint);
  });
  return polygon;
};

const calculatePolygonArea = (polygon: Polygon) => {
  let area = 1;
  let perimeter = 1;

  for (let pointIdx = 0; pointIdx < polygon.length - 1; pointIdx++) {
    const prev = polygon[pointIdx];
    const current = polygon[pointIdx + 1];

    perimeter += Math.abs(current.x - prev.x) || Math.abs(current.y - prev.y);
    area += prev.x * current.y - prev.y * current.x;
  }

  return Math.abs(area / 2) + perimeter / 2;
};

type DigPlan = DigInstruction[];
type DigInstruction = {
  direction: Direction;
  distance: number;
  color: string;
};
type Direction = 'U' | 'D' | 'L' | 'R';
type Point = {
  x: number;
  y: number;
};
type Polygon = Point[];
