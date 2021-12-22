import { readFileSync } from 'fs';

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

type Instruction = {
  state: boolean;
  start: Vec3;
  end: Vec3;
};

type CubeState = Map<string, boolean>;

const InstructionRegExp =
  /([a-z]*) x=([-]?\d*)..([-]?\d*),y=([-]?\d*)..([-]?\d*),z=([-]?\d*)..([-]?\d*)/;

export const createInstructions = (data: string): Instruction[] =>
  data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line)
    .map((line) => {
      const matches = line.match(InstructionRegExp) as RegExpMatchArray;
      return {
        state: matches[1] === 'on',
        start: {
          x: parseInt(matches[2], 10),
          y: parseInt(matches[4], 10),
          z: parseInt(matches[6], 10),
        },
        end: {
          x: parseInt(matches[3], 10),
          y: parseInt(matches[5], 10),
          z: parseInt(matches[7], 10),
        },
      };
    });

const readInstructions = () =>
  createInstructions(readFileSync('./data/2021/day22.txt', 'utf-8'));

const isValid = (instruction: Instruction) =>
  Math.abs(instruction.start.x) <= 50 &&
  Math.abs(instruction.start.y) <= 50 &&
  Math.abs(instruction.start.z) <= 50 &&
  Math.abs(instruction.end.x) <= 50 &&
  Math.abs(instruction.end.y) <= 50 &&
  Math.abs(instruction.end.z) <= 50;

const toKey = (x: number, y: number, z: number) => `${x},${y},${z}`;

export const applyInstructions = (instructions: Instruction[]): CubeState => {
  const state = new Map<string, boolean>();
  instructions.filter(isValid).forEach((instruction) => {
    for (let x = instruction.start.x; x <= instruction.end.x; ++x) {
      for (let y = instruction.start.y; y <= instruction.end.y; ++y) {
        for (let z = instruction.start.z; z <= instruction.end.z; ++z) {
          state.set(toKey(x, y, z), instruction.state);
        }
      }
    }
  });
  return state;
};

export const countOnCubes = (state: CubeState) =>
  [...state.values()].reduce((sum, value) => (value ? sum + 1 : sum), 0);

const day22 = () => {
  const instructions = readInstructions();
  const state = applyInstructions(instructions);
  return countOnCubes(state);
};

export default day22;
