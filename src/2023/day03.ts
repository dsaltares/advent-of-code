import { readFileSync } from 'fs';

type Schematic = string[];

export const day03PartOne = () => {
  const schematic = readSchematic();
  return sumPartNumbers(schematic);
};

export const day03PartTwo = () => {
  const schematic = readSchematic();
  return sumGearRatios(schematic);
};

const readSchematic = () =>
  parseSchematic(readFileSync('./data/2023/day03.txt', 'utf-8'));

export const parseSchematic = (input: string): Schematic =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

export const sumPartNumbers = (schematic: Schematic) =>
  schematic.reduce((acc, line, lineIdx) => {
    const matches = [...line.matchAll(/([0-9]+)/g)];
    return (
      acc +
      matches.reduce((partialAcc, match) => {
        const isPartNumber = hasAdjacentSymbol(schematic, lineIdx, match);
        return isPartNumber ? partialAcc + parseInt(match[0], 10) : partialAcc;
      }, 0)
    );
  }, 0);

const hasAdjacentSymbol = (
  schematic: Schematic,
  lineIdx: number,
  match: RegExpMatchArray
) => {
  const matchLength = match[0].length;
  const matchStartIdx = match.index!;
  return Array.from(Array(matchLength)).some((_, idx) => {
    const colIdx = matchStartIdx + idx;
    return (
      isSymbol(schematic, lineIdx, colIdx - 1) ||
      isSymbol(schematic, lineIdx - 1, colIdx - 1) ||
      isSymbol(schematic, lineIdx - 1, colIdx) ||
      isSymbol(schematic, lineIdx - 1, colIdx + 1) ||
      isSymbol(schematic, lineIdx, colIdx + 1) ||
      isSymbol(schematic, lineIdx + 1, colIdx + 1) ||
      isSymbol(schematic, lineIdx + 1, colIdx) ||
      isSymbol(schematic, lineIdx + 1, colIdx - 1)
    );
  });
};

const isSymbol = (schematic: Schematic, lineIdx: number, colIdx: number) => {
  const height = schematic.length;
  const width = schematic[0].length;
  if (lineIdx < 0 || lineIdx >= height) {
    return false;
  }
  if (colIdx < 0 || colIdx >= width) {
    return false;
  }
  const char = schematic[lineIdx][colIdx];
  return (char < '0' || char > '9') && char !== '.';
};

export const sumGearRatios = (schematic: Schematic) => {
  const height = schematic.length;
  const width = schematic[0].length;
  let sum = 0;

  for (let lineIdx = 0; lineIdx < height; lineIdx++) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      const char = schematic[lineIdx][colIdx];
      if (char !== '*') {
        continue;
      }

      const adjacentParts = [lineIdx - 1, lineIdx, lineIdx + 1]
        .filter((idx) => idx >= 0 && idx < height)
        .flatMap((idx) =>
          [...schematic[idx].matchAll(/([0-9]+)/g)].filter((match) => {
            const matchLength = match[0].length;
            const matchStartIdx = match.index!;
            return (
              colIdx >= matchStartIdx - 1 &&
              colIdx <= matchStartIdx + matchLength
            );
          })
        );

      if (adjacentParts.length == 2) {
        sum +=
          parseInt(adjacentParts[0][0], 10) * parseInt(adjacentParts[1][0], 10);
      }
    }
  }

  return sum;
};
