import { readFileSync } from 'fs';

export const day17PartOne = () => countCombinations(readContainers(), 150);

export const day17PartTwo = () =>
  countCombinationsWithMinimumNumberOfContainers(readContainers(), 150);

const readContainers = () =>
  parseContainers(readFileSync('./data/2015/day17.txt', 'utf-8'));

export const parseContainers = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => parseInt(line, 10));

export const countCombinations = (containers: number[], target: number) =>
  getAllValidCombinations(containers, target).length;

export const countCombinationsWithMinimumNumberOfContainers = (
  containers: number[],
  target: number
) => {
  const combinations = getAllValidCombinations(containers, target);
  const minContainers = Math.min(...combinations.map((c) => c.length));
  return combinations.filter((c) => c.length === minContainers).length;
};

const getAllValidCombinations = (
  containers: number[],
  target: number
): number[][] =>
  Array.from(Array(Math.pow(2, containers.length)))
    .map((_, setIdx) =>
      Array.from(Array(containers.length)).reduce(
        (subset, _, containerIdx) =>
          setIdx & (1 << containerIdx)
            ? [...subset, containers[containerIdx]]
            : subset,
        [] as number[]
      )
    )
    .filter(
      (subset: number[]) =>
        subset.reduce((sum, container) => sum + container, 0) === target
    );
