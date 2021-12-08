import { readFileSync } from 'fs';

export type Entry = {
  signalPatterns: string[];
  output: string[];
};

const UniqueNumberOfSegments = new Set([2, 4, 3, 7]);

export const createMalfunctioningEntries = (input: string): Entry[] =>
  input
    .split('\n')
    .filter((line) => !!line)
    .map((line) => {
      const parts = line.split(' | ');
      return {
        signalPatterns: parts[0].split(' '),
        output: parts[1].split(' '),
      };
    });

const readMalfunctioningEntries = () =>
  createMalfunctioningEntries(readFileSync('./data/2021/day08.txt', 'utf-8'));

const hasUniqueNumberOfSegments = (digit: string) =>
  UniqueNumberOfSegments.has(digit.length);

export const countDigitsWithUniqueNumberOfSegments = (entries: Entry[]) =>
  entries.reduce(
    (sum, entry) => sum + entry.output.filter(hasUniqueNumberOfSegments).length,
    0
  );

const day08 = () => {
  const entries = readMalfunctioningEntries();
  return countDigitsWithUniqueNumberOfSegments(entries);
};

export default day08;
