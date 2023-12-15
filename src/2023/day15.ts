import { readFileSync } from 'fs';

export const day15PartOne = () => {
  const sequence = readSequence();
  return sumHashes(sequence);
};

export const day15PartTwo = () => {
  const sequence = readSequence();
  return runSequenceAndGetFocusPower(sequence);
};

const readSequence = () =>
  parseSequence(readFileSync('./data/2023/day15.txt', 'utf-8'));

export const parseSequence = (input: string): string[] =>
  input
    .replace('\n', '')
    .split(',')
    .map((step) => step.trim());

export const sumHashes = (sequence: string[]) =>
  sequence.reduce((acc, step) => acc + getHash(step), 0);

export const getHash = (step: string) =>
  step
    .split('')
    .reduce((hash, char) => ((hash + char.charCodeAt(0)) * 17) % 256, 0);

export const runSequenceAndGetFocusPower = (sequence: string[]) => {
  const instructions = parseInstructions(sequence);
  const boxes = runInstructions(instructions);
  return getFocusingPower(boxes);
};

type Operator = '=' | '-';
type Instruction = {
  label: string;
  operator: Operator;
  focalLength?: number;
};
type Lens = {
  label: string;
  focalLength: number;
};
type Box = Lens[];
type Boxes = Box[];

const parseInstructions = (sequence: string[]): Instruction[] =>
  sequence.map((step) => {
    const label = step.match(/[a-z]+/)![0];
    const rest = step.replace(label, '');
    const operator = rest.charAt(0) as Operator;
    const focalLength = rest.substring(1);
    return {
      label,
      operator,
      focalLength:
        focalLength.length > 0 ? parseInt(focalLength, 10) : undefined,
    };
  });

const runInstructions = (instructions: Instruction[]): Boxes => {
  const boxes: Boxes = Array.from(Array(256)).map(() => []);
  instructions.forEach((instruction) => runInstruction(boxes, instruction));
  return boxes;
};

const runInstruction = (boxes: Boxes, instruction: Instruction) => {
  const labelHash = getHash(instruction.label);
  const box = boxes[labelHash];
  const idx = box.findIndex((lens) => lens.label === instruction.label);
  if (instruction.operator === '-') {
    if (idx > -1) {
      boxes[labelHash] = box.slice(0, idx).concat(box.slice(idx + 1));
    }
  } else if (instruction.operator === '=' && !!instruction.focalLength) {
    const newLens = {
      label: instruction.label,
      focalLength: instruction.focalLength,
    };
    if (idx > -1) {
      box[idx] = newLens;
    } else {
      box.push(newLens);
    }
  }
};

const getFocusingPower = (boxes: Boxes) =>
  boxes.reduce(
    (acc, box, boxNumber) =>
      acc +
      box.reduce((boxAcc, lens, slot) => {
        const focusingPower = (boxNumber + 1) * (slot + 1) * lens.focalLength;
        return boxAcc + focusingPower;
      }, 0),
    0
  );
