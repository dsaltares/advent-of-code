import { readFileSync } from 'fs';

export const day09PartOne = () =>
  getShortestDistanceVisitingAll(readDistances());

export const day09PartTwo = () =>
  getLongestDistanceVisitingAll(readDistances());

const readDistances = () =>
  parseDistances(readFileSync('./data/2015/day09.txt', 'utf-8'));

export const parseDistances = (input: string) => {
  const distances: Distances = {};
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
      const matches = line.match(/(\w+) to (\w+) = (\d+)/);
      if (matches) {
        const from = matches[1];
        const to = matches[2];
        const distance = parseInt(matches[3], 10);
        distances[from] = distances[from] || {};
        distances[from][to] = distance;
        distances[to] = distances[to] || {};
        distances[to][from] = distance;
      }
    });
  return distances;
};

export const getShortestDistanceVisitingAll = (distances: Distances) =>
  getBestDistanceVisitingAll(distances, asc);

export const getLongestDistanceVisitingAll = (distances: Distances) =>
  getBestDistanceVisitingAll(distances, desc);

const getBestDistanceVisitingAll = (
  distances: Distances,
  compareFn: (a: number, b: number) => number
) =>
  generatePaths(distances)
    .map((path) => getDistance(distances, path))
    .sort(compareFn)[0];

const generatePaths = (distances: Distances) => {
  const paths: string[][] = [];
  Object.keys(distances).forEach((city) => {
    const path = [city];
    generatePathsHelper(distances, path, paths);
  });
  return paths;
};

const generatePathsHelper = (
  distances: Distances,
  path: string[],
  paths: string[][]
) => {
  const visited = new Set(path);
  if (path.length === Object.keys(distances).length) {
    paths.push(path);
    return;
  }
  const lastCity = path[path.length - 1];
  Object.keys(distances[lastCity]).forEach((city) => {
    if (!visited.has(city)) {
      generatePathsHelper(distances, [...path, city], paths);
    }
  });
};

const getDistance = (distances: Distances, path: string[]) =>
  Array.from(Array(path.length - 1)).reduce((total, _, index) => {
    const from = path[index];
    const to = path[index + 1];
    return total + distances[from][to];
  }, 0);

const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;

type Distances = Record<string, Record<string, number>>;
