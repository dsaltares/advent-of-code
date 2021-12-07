import { readFileSync } from 'fs';

const readCrabPositions = () =>
  readFileSync('./data/2021/day07.txt', 'utf-8')
    .split(',')
    .filter((number) => !!number)
    .map((number) => parseInt(number.trimStart().trimEnd(), 10));

const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);

type FuelConsumptionFn = (distance: number) => number;

export const linearFuelConsumption: FuelConsumptionFn = (distance: number) =>
  distance;

export const crabFuelConsumption: FuelConsumptionFn = (distance: number) =>
  (distance * (distance + 1)) / 2;

export const getMinimumFuelCostForCrabAlignment = (
  positions: number[],
  fuelConsumptionFn: FuelConsumptionFn
) => {
  const fuelCostToAlignPerPosition = range(
    Math.min(...positions),
    Math.max(...positions)
  ).map((targetPos) =>
    positions.reduce(
      (sum, position) =>
        sum + fuelConsumptionFn(Math.abs(targetPos - position)),
      0
    )
  );
  return Math.min(...fuelCostToAlignPerPosition);
};

const day07 = () => {
  const positions = readCrabPositions();
  return getMinimumFuelCostForCrabAlignment(positions, linearFuelConsumption);
};

export const day07PartTwo = () => {
  const positions = readCrabPositions();
  return getMinimumFuelCostForCrabAlignment(positions, crabFuelConsumption);
};

export default day07;
