import { readFileSync } from 'fs';

export const day07PartOne = () => {
  const instructions = readInstructions();
  return solve(instructions, 'a');
};

export const day07PartTwo = () => {
  const instructions = readInstructions();
  instructions.set('b', {
    operator: 'ASSIGN',
    operands: [solve(instructions, 'a')],
    wire: 'b',
  });
  return solve(instructions, 'a');
};

const readInstructions = () =>
  parseInstructions(readFileSync('./data/2015/day07.txt', 'utf-8'));

export const parseInstructions = (input: string): InstructionsByWire => {
  const instructions = new Map<string, Instruction>();
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
      const [leftHand, wire] = line.split(' -> ');
      const parts = leftHand.split(' ');
      if (parts.length === 1) {
        instructions.set(wire, {
          operands: [parseOperand(parts[0])],
          operator: 'ASSIGN',
          wire,
        });
      } else if (parts.length === 2) {
        instructions.set(wire, {
          operands: [parseOperand(parts[1])],
          operator: parts[0] as Instruction['operator'],
          wire,
        });
      } else if (parts.length === 3) {
        instructions.set(wire, {
          operands: [parseOperand(parts[0]), parseOperand(parts[2])],
          operator: parts[1] as Instruction['operator'],
          wire,
        });
      }
    });

  return instructions;
};

export const solve = (
  instructions: InstructionsByWire,
  target: Operand,
  cache: Map<string, number> = new Map()
): number => {
  if (typeof target === 'number') {
    return target;
  }
  const instruction = instructions.get(target);
  if (!instruction) {
    return 0;
  }

  const cached = cache.get(target);
  if (cached) {
    return cached;
  }
  const { operator, operands } = instruction;
  let value: number;
  switch (operator) {
    case 'ASSIGN':
      value = solve(instructions, operands[0], cache);
      break;
    case 'AND':
      value =
        solve(instructions, operands[0], cache) &
        solve(instructions, operands[1], cache);
      break;
    case 'OR':
      value =
        solve(instructions, operands[0], cache) |
        solve(instructions, operands[1], cache);
      break;
    case 'LSHIFT':
      value = uint16(
        solve(instructions, operands[0], cache) <<
          solve(instructions, operands[1], cache)
      );
      break;
    case 'RSHIFT':
      value = uint16(
        solve(instructions, operands[0], cache) >>>
          solve(instructions, operands[1], cache)
      );
      break;
    case 'NOT':
      value = uint16(~solve(instructions, operands[0], cache));
      break;
  }

  cache.set(target, value);
  return value;
};

const uint16 = (n: number) => {
  return n & 0xffff;
};

const parseOperand = (operand: string) => {
  const parsed = parseInt(operand, 10);
  return isNaN(parsed) ? operand : parsed;
};

type InstructionsByWire = Map<string, Instruction>;
type Instruction = {
  operands: Operand[];
  operator: 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT' | 'NOT' | 'ASSIGN';
  wire: string;
};
type Operand = number | string;
