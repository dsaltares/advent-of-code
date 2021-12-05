import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

type Vector2 = {
  x: number;
  y: number;
};

export type Segment = {
  start: Vector2;
  end: Vector2;
};

export type DangerMap = number[][];

type Size = {
  height: number;
  width: number;
};

type SegmentFilterFn = (segment: Segment) => boolean;

export const createVentSegments = (rows: string[]): Segment[] => {
  const ventLines: Segment[] = [];
  rows.forEach((row) => {
    const [first, second] = row.split(' -> ');
    const firstParts = first.split(',');
    const secondParts = second.split(',');
    ventLines.push({
      start: {
        x: parseInt(firstParts[0], 10),
        y: parseInt(firstParts[1], 10),
      },
      end: {
        x: parseInt(secondParts[0], 10),
        y: parseInt(secondParts[1], 10),
      },
    });
  });

  return ventLines;
};

const readVentSegments = () => {
  const rows = readFileSync('./data/day05.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line);

  return createVentSegments(rows);
};

export const getMapSize = (segments: Segment[]) => ({
  width:
    Math.max(
      ...segments.map((segment) => Math.max(segment.start.x, segment.end.x))
    ) + 1,
  height:
    Math.max(
      ...segments.map((segment) => Math.max(segment.start.y, segment.end.y))
    ) + 1,
});

export const initializeDangerMap = (size: Size) =>
  Array(size.height)
    .fill(0)
    .map(() => Array(size.height).fill(0));

const isHorizontalOrVertical = (segment: Segment) => {
  const isHorizontal = segment.start.y === segment.end.y;
  const isVertical = segment.start.x === segment.end.x;
  return isHorizontal || isVertical;
};

const is45Degrees = (segment: Segment) => {
  const horizontalDif = Math.abs(segment.start.x - segment.end.x);
  const verticalDiff = Math.abs(segment.start.y - segment.end.y);
  return horizontalDif === verticalDiff;
};

export const isHorizontalVerticalOr45Degrees = (segment: Segment) => {
  return isHorizontalOrVertical(segment) || is45Degrees(segment);
};

export const generateDangerMap = (
  emptyDangerMap: DangerMap,
  segments: Segment[],
  filterFn: SegmentFilterFn = isHorizontalOrVertical
): DangerMap => {
  const dangerMap = cloneDeep(emptyDangerMap);
  const validSegments = segments.filter(filterFn);
  validSegments.forEach((segment) => {
    const steps = Math.max(
      Math.abs(segment.start.x - segment.end.x),
      Math.abs(segment.start.y - segment.end.y)
    );
    const horizontalDir = Math.sign(segment.end.x - segment.start.x);
    const verticalDir = Math.sign(segment.end.y - segment.start.y);

    for (let idx = 0; idx <= steps; ++idx) {
      const colIdx = segment.start.x + idx * horizontalDir;
      const rowIdx = segment.start.y + idx * verticalDir;
      dangerMap[rowIdx][colIdx] += 1;
    }
  });

  return dangerMap;
};

export const numberOfDangerousPoints = (dangerMap: DangerMap) => {
  let count = 0;
  dangerMap.forEach((row) =>
    row.forEach((cell) => {
      if (cell >= 2) {
        count += 1;
      }
    })
  );
  return count;
};

const day05 = () => {
  const segments = readVentSegments();
  const size = getMapSize(segments);
  const emptyDangerMap = initializeDangerMap(size);
  const dangerMap = generateDangerMap(
    emptyDangerMap,
    segments,
    isHorizontalOrVertical
  );
  const count = numberOfDangerousPoints(dangerMap);
  return count;
};

export const day05PartTwo = () => {
  const segments = readVentSegments();
  const size = getMapSize(segments);
  const emptyDangerMap = initializeDangerMap(size);
  const dangerMap = generateDangerMap(
    emptyDangerMap,
    segments,
    isHorizontalVerticalOr45Degrees
  );
  const count = numberOfDangerousPoints(dangerMap);
  return count;
};

export default day05;
