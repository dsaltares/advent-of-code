import { readFileSync } from 'fs';

type Direction = 'L' | 'R';

type Network = {
  steps: string;
  nodes: {
    [key in string]: {
      L: string;
      R: string;
    };
  };
};

type IsExitFn = (node: string) => boolean;

export const day08PartOne = () => {
  const network = readNetwork();
  return getNumStepsToExit(network);
};

export const day08PartTwo = () => {
  const network = readNetwork();
  return getNumGhostSteps(network);
};

const readNetwork = () =>
  parseNetwork(readFileSync('./data/2023/day08.txt', 'utf-8'));

export const parseNetwork = (input: string): Network => {
  const [steps, ...lines] = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);
  return {
    steps,
    nodes: lines.reduce((acc, line) => {
      const [node, rest] = line.split(' = ');
      const [L, R] = rest.replace('(', '').replace(')', '').split(', ');
      return {
        [node]: { L, R },
        ...acc,
      };
    }, {}),
  };
};

export const getNumStepsToExit = (network: Network) =>
  getNumSteps(network, 'AAA', (node) => node === 'ZZZ');

export const getNumGhostSteps = (network: Network) =>
  leastCommonMultiple(
    Object.keys(network.nodes)
      .filter((node) => node.endsWith('A'))
      .map((node) => getNumSteps(network, node, (node) => node.endsWith('Z')))
  );

const getNumSteps = (network: Network, from: string, isExit: IsExitFn) => {
  let currentNode = from;
  let steps = 0;
  while (!isExit(currentNode)) {
    const nextStep = network.steps[steps % network.steps.length] as Direction;
    currentNode = network.nodes[currentNode][nextStep];
    steps++;
  }
  return steps;
};

const leastCommonMultiple = (nums: number[]) => {
  let lcm = nums[0];
  nums.forEach((num) => {
    lcm = (lcm * num) / greatestCommonDivisor(lcm, num);
  });
  return lcm;
};

const greatestCommonDivisor = (a: number, b: number): number =>
  b === 0 ? a : greatestCommonDivisor(b, a % b);
