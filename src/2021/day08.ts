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

const isMatch = (digit: string, decoderKey: string) =>
  digit.length === decoderKey.length &&
  [...digit].every((segment) => decoderKey.includes(segment));

const decodeDigit = (digit: string, decoderKeys: string[]) =>
  decoderKeys.findIndex((decoderKey) => isMatch(digit, decoderKey));

export const decodeOutput = (entry: Entry) => {
  const sortedSignals = [...entry.signalPatterns].sort(
    (a, b) => a.length - b.length
  );
  const keys: string[] = Array(10).fill('');

  // 1, 7 and 4 have 2, 3 and 4 segments and
  // will always be in positions 0, 1 and 2 of the sorted signals
  keys[1] = sortedSignals[0];
  keys[7] = sortedSignals[1];
  keys[4] = sortedSignals[2];

  // 8 has the most segments, will always be at the last position
  keys[8] = sortedSignals[9];

  // 0, 6 and 9 have 6 segments and will be in positions 6, 7 and 8.
  const zeroSixNine = sortedSignals.slice(6, 9);

  // 1 completely overlaps with 9 and 0 but not with 6
  keys[6] = zeroSixNine.filter(
    (signal) => ![...keys[1]].every((segment) => signal.includes(segment))
  )[0];
  const zeroNine = zeroSixNine.filter((signal) => signal !== keys[6]);

  // 4 is contained in 9 but not in 0
  keys[9] = zeroNine.filter((signal) =>
    [...keys[4]].every((segment) => signal.includes(segment))
  )[0];

  // 0 is the only one left
  keys[0] = zeroNine.filter((signal) => signal !== keys[9])[0];

  // 3, 2 and 5 have 5 segments and will always be in positions 3, 4 and 5.
  const threeTwoFive = sortedSignals.slice(3, 6);

  // 1 is contained in 3 but not in 5 nor 2
  keys[3] = threeTwoFive.filter((signal) =>
    [...keys[1]].every((segment) => signal.includes(segment))
  )[0];
  const twoFive = threeTwoFive.filter((signal) => signal !== keys[3]);

  // 5 is contained in 9 but 2 is not
  keys[5] = twoFive.filter((signal) =>
    [...signal].every((segment) => keys[9].includes(segment))
  )[0];

  // 2 is the only one left
  keys[2] = twoFive.filter((signal) => signal !== keys[5])[0];

  return parseInt(
    entry.output.map((signal) => decodeDigit(signal, keys).toString()).join(''),
    10
  );
};

export const sumOfDecodedOutputDigits = (entries: Entry[]) =>
  entries.reduce((sum, entry) => sum + decodeOutput(entry), 0);

const day08 = () => {
  const entries = readMalfunctioningEntries();
  return countDigitsWithUniqueNumberOfSegments(entries);
};

export const day08PartTwo = () => {
  const entries = readMalfunctioningEntries();
  return sumOfDecodedOutputDigits(entries);
};

export default day08;
