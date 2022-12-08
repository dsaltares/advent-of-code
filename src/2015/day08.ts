import { readFileSync } from 'fs';

export const day08PartOne = () =>
  codeCharactersMinusMemoryCharacters(readSantaList());

export const day08PartTwo = () =>
  encodedCharactersMinusCodeCharacters(readSantaList());

const readSantaList = () =>
  parseSantaList(readFileSync('./data/2015/day08.txt', 'utf-8'));

export const parseSantaList = (input: string) =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

export const codeCharactersMinusMemoryCharacters = (list: string[]) =>
  sumListValues(list, getCodeLength) - sumListValues(list, getMemoryLength);

export const encodedCharactersMinusCodeCharacters = (list: string[]) =>
  sumListValues(list, getEncodedLength) - sumListValues(list, getCodeLength);

const sumListValues = (list: string[], getValueFn: (line: string) => number) =>
  list.reduce((total, line) => total + getValueFn(line), 0);
export const getCodeLength = (line: string) => line.length;
export const getMemoryLength = (line: string) => eval(line).length;
export const getEncodedLength = (line: string) => JSON.stringify(line).length;
