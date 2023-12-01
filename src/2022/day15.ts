import { readFileSync } from 'fs';

export const day15PartOne = () => nonBeaconPositions(readSensors(), 2000000);

export const day15PartTwo = () => getTuningFrequency(readSensors(), 4000000);

const readSensors = () =>
  parseSensors(readFileSync('./data/2022/day15.txt', 'utf-8'));

export const parseSensors = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const matches = line.match(
        /Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/
      ) as RegExpMatchArray;
      return {
        pos: [parseInt(matches[1], 10), parseInt(matches[2], 10)] as Position,
        closestBeacon: [
          parseInt(matches[3], 10),
          parseInt(matches[4], 10),
        ] as Position,
      };
    });

export const nonBeaconPositions = (sensors: Sensor[], y: number) =>
  countElements(mergeRanges(getNonBeaconRanges(sensors, y)));

export const getTuningFrequency = (sensors: Sensor[], bound: number) => {
  for (let y = 0; y <= bound; y++) {
    const ranges = mergeRanges(getNonBeaconRanges(sensors, y));
    if (ranges.length === 2) {
      const endX = ranges[0][1];
      return (endX + 1) * 4000000 + y;
    }
  }
};

const getNonBeaconRanges = (sensors: Sensor[], y: number): Range[] =>
  sensors
    .map((sensor) => {
      const yDiff = Math.abs(sensor.pos[1] - y);
      const xRange = distance(sensor.pos, sensor.closestBeacon) - yDiff;
      if (xRange < 0) {
        return;
      }
      const range: Range = [sensor.pos[0] - xRange, sensor.pos[0] + xRange];
      return range;
    })
    .filter((range) => !!range) as Range[];

const mergeRanges = (ranges: Range[]): Range[] => {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: Range[] = [];
  let previous: Range = sorted[0];
  sorted.slice(1).forEach((current) => {
    if (previous[1] >= current[0]) {
      previous = [previous[0], Math.max(previous[1], current[1])];
    } else {
      merged.push(previous);
      previous = current;
    }
  });
  merged.push(previous);
  return merged;
};

const countElements = (ranges: Range[]) =>
  ranges.reduce((total, range) => total + range[1] - range[0] + 1, 0) - 1;

const distance = ([x1, y1]: Position, [x2, y2]: Position) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

export type Sensor = {
  pos: Position;
  closestBeacon: Position;
};

type Position = [number, number];

type Range = [number, number];
