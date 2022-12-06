import crypto from 'crypto';

const input = 'iwrupvqb';

export const day04PartOne = () => getLowestNumberWith5ZeroHash(input);

export const day04PartTwo = () => getLowestNumberWith6ZeroHash(input);

export const getLowestNumberWith5ZeroHash = (key: string) =>
  getLowestNumberWithNZeroHash(key, 5);

export const getLowestNumberWith6ZeroHash = (key: string) =>
  getLowestNumberWithNZeroHash(key, 6);

const getLowestNumberWithNZeroHash = (key: string, numZeroes: number) => {
  const zeroes = Array.from(Array(numZeroes)).fill('0').join('');
  for (let number = 0; number < Infinity; ++number) {
    if (
      md5(`${key}${number}`).split('').slice(0, numZeroes).join('') === zeroes
    ) {
      return number;
    }
  }
  return Infinity;
};

const md5 = (data: string) =>
  crypto.createHash('md5').update(data).digest('hex');
