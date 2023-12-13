import { readFileSync } from 'fs';

type Pattern = string[];

export const day13PartOne = () => {
  const patterns = readPatterns();
  return sumPatternNotes(patterns);
};

export const day13PartTwo = () => {
  const patterns = readPatterns();
  return sumPatternNotesWithSmudges(patterns);
};

export const readPatterns = () =>
  parsePatterns(readFileSync('./data/2023/day13.txt', 'utf-8'));

export const parsePatterns = (input: string): Pattern[] =>
  input.split('\n\n').map((pattern) =>
    pattern
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line)
  );

export const sumPatternNotes = (patterns: Pattern[]) =>
  patterns.reduce((acc, pattern) => acc + getPatternNotes(pattern), 0);

export const sumPatternNotesWithSmudges = (patterns: Pattern[]) =>
  patterns.reduce(
    (acc, pattern) => acc + getPatternNotesWithSmudge(pattern),
    0
  );

const getPatternNotes = (pattern: Pattern) => {
  const rowsAbove = getRowsAboveReflection(pattern);
  if (rowsAbove > 0) {
    return 100 * rowsAbove;
  }
  return getColumnsLeftOfReflection(pattern);
};

export const getPatternNotesWithSmudge = (pattern: Pattern) => {
  const originalAbove = getRowsAboveReflection(pattern);
  const originalLeft = getColumnsLeftOfReflection(pattern);

  const height = pattern.length;
  const width = pattern[0].length;

  for (let rowIdx = 0; rowIdx < height; rowIdx++) {
    for (let colIdx = 0; colIdx < width; colIdx++) {
      const patternCpy = JSON.parse(JSON.stringify(pattern)) as Pattern;
      patternCpy[rowIdx] = cleanSmudge(patternCpy[rowIdx], colIdx);
      const above = getRowsAboveReflection(patternCpy);
      const left = getColumnsLeftOfReflection(patternCpy);
      const hasMirror = above > 0 || left > 0;
      const mirrorIsDifferent =
        above !== originalAbove || left !== originalLeft;
      if (hasMirror && mirrorIsDifferent) {
        if (originalAbove > 0 && above === originalAbove) {
          return left;
        }
        if (originalLeft > 0 && left === originalLeft) {
          return 100 * above;
        }
        return above > 0 ? 100 * above : left;
      }
    }
  }
  return 0;
};

const cleanSmudge = (line: string, idx: number) => {
  const char = line[idx];
  const newChar = char === '.' ? '#' : '.';
  return line.substring(0, idx) + newChar + line.substring(idx + 1);
};

const getColumnsLeftOfReflection = (pattern: Pattern) => {
  const width = pattern[0].length;
  let max = 0;
  for (let colIdx = 0; colIdx < width - 1; colIdx++) {
    if (hasVerticalSymmetry(pattern, colIdx) && colIdx + 1 > max) {
      max = colIdx + 1;
    }
  }

  return max;
};

const getRowsAboveReflection = (pattern: Pattern) => {
  const height = pattern.length;
  let max = 0;
  for (let rowIdx = 0; rowIdx < height - 1; rowIdx++) {
    if (hasHorizontalSymmetry(pattern, rowIdx) && rowIdx + 1 > max) {
      max = rowIdx + 1;
    }
  }

  return max;
};

export const hasHorizontalSymmetry = (pattern: Pattern, rowIdx: number) => {
  const height = pattern.length;
  let aboveIdx = rowIdx;
  let belowIdx = rowIdx + 1;

  while (aboveIdx >= 0 && belowIdx < height) {
    if (pattern[aboveIdx] !== pattern[belowIdx]) {
      return false;
    }

    aboveIdx--;
    belowIdx++;
  }
  return true;
};

const hasVerticalSymmetry = (pattern: Pattern, colIdx: number) => {
  const width = pattern[0].length;
  let leftIdx = colIdx;
  let rightIdx = colIdx + 1;

  while (leftIdx >= 0 && rightIdx < width) {
    const leftCol = pattern.map((row) => row[leftIdx]).join('');
    const rightCol = pattern.map((row) => row[rightIdx]).join('');
    if (leftCol !== rightCol) {
      return false;
    }

    leftIdx--;
    rightIdx++;
  }
  return true;
};
