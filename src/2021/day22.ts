import { readFileSync } from 'fs';

type Range = [number, number];

type Cuboid = {
  x: Range;
  y: Range;
  z: Range;
};

type Instruction = {
  state: boolean;
  cuboid: Cuboid;
};

type Core = Cuboid[];

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
        cuboid: {
          x: [parseInt(matches[2], 10), parseInt(matches[3], 10)],
          y: [parseInt(matches[4], 10), parseInt(matches[5], 10)],
          z: [parseInt(matches[6], 10), parseInt(matches[7], 10)],
        },
      };
    });

const readInstructions = () =>
  createInstructions(readFileSync('./data/2021/day22.txt', 'utf-8'));

const isLarge = (instruction: Instruction) =>
  Math.abs(instruction.cuboid.x[0]) <= 50 &&
  Math.abs(instruction.cuboid.x[1]) <= 50 &&
  Math.abs(instruction.cuboid.y[0]) <= 50 &&
  Math.abs(instruction.cuboid.y[1]) <= 50 &&
  Math.abs(instruction.cuboid.z[0]) <= 50 &&
  Math.abs(instruction.cuboid.z[1]) <= 50;

const intersectSegs = (
  [aLow, aHigh]: Range,
  [bLow, bHigh]: Range
): Range | undefined => {
  if (aHigh < bLow || bHigh < aLow) {
    return;
  }
  return [Math.max(aLow, bLow), Math.min(aHigh, bHigh)];
};

const intersect = (a: Cuboid, b: Cuboid) => {
  const common = {
    x: intersectSegs(a.x, b.x),
    y: intersectSegs(a.y, b.y),
    z: intersectSegs(a.z, b.z),
  };
  if (common.x && common.y && common.z) {
    return common as Cuboid;
  }
};

const diffSegs = ([aLow, aHigh]: Range, [bLow, bHigh]: Range) => {
  const segs = [];
  if (aLow < bLow) {
    segs.push([aLow, bLow - 1]);
  }
  if (bHigh < aHigh) {
    segs.push([bHigh + 1, aHigh]);
  }
  return segs;
};

const difference = (a: Cuboid, b: Cuboid): Cuboid[] => {
  let xsegs = diffSegs(a.x, b.x);
  xsegs = [xsegs[0], b.x, ...xsegs.slice(1)];
  let ysegs = diffSegs(a.y, b.y);
  ysegs = [ysegs[0], b.y, ...ysegs.slice(1)];
  let zsegs = diffSegs(a.z, b.z);
  zsegs = [zsegs[0], b.z, ...zsegs.slice(1)];

  const result: Cuboid[] = [];
  for (let x = 0; x < xsegs.length; x++) {
    for (let y = 0; y < ysegs.length; y++) {
      for (let z = 0; z < zsegs.length; z++) {
        if (x === 1 && y === 1 && z === 1) {
          continue;
        }
        const cuboid: Cuboid = {
          x: xsegs[x] as Range,
          y: ysegs[y] as Range,
          z: zsegs[z] as Range,
        };
        if (!cuboid.x || !cuboid.y || !cuboid.z) {
          continue;
        }
        result.push(cuboid);
      }
    }
  }
  return result;
};

export const applyInstructions = (
  instructions: Instruction[],
  skipLarge = true
): Core => {
  let core: Core = [];
  for (const instruction of instructions) {
    const newCore = [];
    if (skipLarge && !isLarge(instruction)) {
      continue;
    }
    for (const A of core) {
      const common = intersect(A, instruction.cuboid);
      if (common) {
        newCore.push(...difference(A, common));
      } else {
        newCore.push(A);
      }
    }

    if (instruction.state) {
      newCore.push(instruction.cuboid);
    }
    core = newCore;
  }
  return core;
};

export const countCubes = (core: Core) =>
  core.reduce(
    (count, { x: [xlow, xhigh], y: [ylow, yhigh], z: [zlow, zhigh] }) =>
      count + (xhigh - xlow + 1) * (yhigh - ylow + 1) * (zhigh - zlow + 1),
    0
  );

const day22 = () => {
  const instructions = readInstructions();
  const state = applyInstructions(instructions);
  return countCubes(state);
};

export const day22PartTwo = () => {
  const instructions = readInstructions();
  const skipLarge = false;
  const state = applyInstructions(instructions, skipLarge);
  return countCubes(state);
};

export default day22;
