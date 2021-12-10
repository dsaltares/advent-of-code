import { readFileSync } from 'fs';

const readLines = () =>
  readFileSync('./data/2021/day10.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line);

const PointTable: Record<string, number> = {
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

const isOpening = (value: string) => PointTable[value] === undefined;

export const getLineSyntaxErrorScore = (line: string) => {
  const stack = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const current = line[i];
    if (isOpening(current)) {
      stack.push(current);
    } else if (stack.length === 0) {
      return PointTable[current];
    } else {
      const top = stack.pop() as string;
      const valid = isOpening(top) && OpeningByClosing[current] === top;
      if (!valid) {
        return PointTable[current];
      }
    }
  }
  return 0;
};

export const getFileSyntaxErrorScore = (lines: string[]) =>
  lines.reduce((sum, line) => sum + getLineSyntaxErrorScore(line), 0);

const day10 = () => {
  const lines = readLines();
  const score = getFileSyntaxErrorScore(lines);
  return score;
};

export default day10;
