import { readFileSync } from 'fs';

export const day05PartOne = () => countNiceStrings(readStrings(), isNice);

export const day05PartTwo = () => countNiceStrings(readStrings(), isNiceV2);

const readStrings = () =>
  parseStrings(readFileSync('data/2015/day05.txt', 'utf-8'));

const parseStrings = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

const countNiceStrings = (
  strings: string[],
  filterFn: (str: string) => boolean
) => strings.filter(filterFn).length;

const ForbiddenStrings = ['ab', 'cd', 'pq', 'xy'];

export const isNice = (str: string) => {
  const vowelMatch = str.match(/[aeiou]/gi);
  const hasAtLeastThreeVowels = !!vowelMatch && vowelMatch.length >= 3;
  const hasDoubleLetter = Array.from(Array(str.length - 1)).some(
    (_value, index) => str.charAt(index) === str.charAt(index + 1)
  );
  const hasNoForbiddenString = !ForbiddenStrings.some((forbidden) =>
    str.includes(forbidden)
  );
  return hasAtLeastThreeVowels && hasDoubleLetter && hasNoForbiddenString;
};

export const isNiceV2 = (str: string) => {
  const letters = str.split('');
  const hasDoublePair = letters.some((_first, firstIdx) =>
    letters
      .slice(firstIdx + 2, letters.length)
      .some(
        (_second, secondIdx, slice) =>
          `${letters[firstIdx]}${letters[firstIdx + 1]}` ===
          `${slice[secondIdx]}${slice[secondIdx + 1]}`
      )
  );
  const hasDoubleLetterWithOneInBetween = Array.from(
    Array(str.length - 2)
  ).some(
    (_value, index) =>
      str.charAt(index) === str.charAt(index + 2) &&
      str.charAt(index) !== str.charAt(index + 1)
  );
  return hasDoubleLetterWithOneInBetween && hasDoublePair;
};
