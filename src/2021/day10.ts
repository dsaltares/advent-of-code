import { readFileSync } from 'fs';

const readLines = () =>
  readFileSync('./data/2021/day10.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line);

const CorruptPoints: Record<string, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const OpeningByClosing: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const ClosingByOpening: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const AutocompletePoints: Record<string, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const isOpening = (value: string) => CorruptPoints[value] === undefined;

export const getLineSyntaxErrorScore = (line: string) => {
  const stack = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const current = line[i];
    if (isOpening(current)) {
      stack.push(current);
    } else if (stack.length === 0) {
      return CorruptPoints[current];
    } else {
      const top = stack.pop() as string;
      const valid = isOpening(top) && OpeningByClosing[current] === top;
      if (!valid) {
        return CorruptPoints[current];
      }
    }
  }
  return 0;
};

export const getStackAutocompleteScore = (stack: string[]) =>
  [...stack]
    .reverse()
    .reduce(
      (score, opening) =>
        score * 5 + AutocompletePoints[ClosingByOpening[opening]],
      0
    );

export const getLineAutocompleteScore = (line: string) => {
  const stack = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const current = line[i];
    if (isOpening(current)) {
      stack.push(current);
    } else if (stack.length === 0) {
      return 0;
    } else {
      const top = stack.pop() as string;
      const valid = isOpening(top) && OpeningByClosing[current] === top;
      if (!valid) {
        return 0;
      }
    }
  }

  return getStackAutocompleteScore(stack);
};

export const getFileSyntaxErrorScore = (lines: string[]) =>
  lines.reduce((sum, line) => sum + getLineSyntaxErrorScore(line), 0);

export const getFileAutocompleteScore = (lines: string[]) => {
  const scores = lines
    .map(getLineAutocompleteScore)
    .filter((score) => score > 0)
    .sort((a, b) => b - a);

  return scores[Math.floor(scores.length / 2)];
};

const day10 = () => {
  const lines = readLines();
  const score = getFileSyntaxErrorScore(lines);
  return score;
};

export const day10PartTwo = () => {
  const lines = readLines();
  const score = getFileAutocompleteScore(lines);
  return score;
};

export default day10;
