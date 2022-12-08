import {
  codeCharactersMinusMemoryCharacters,
  encodedCharactersMinusCodeCharacters,
  getCodeLength,
  getEncodedLength,
  getMemoryLength,
  parseSantaList,
} from './day08';

const lines = ['""', '"abc"', '"aaa\\"aaa"', '"\\x27"'];
const input = lines.join('\n');

describe('day08PartOne', () => {
  it('returns the number of code characters minus the memory characters', () => {
    expect(codeCharactersMinusMemoryCharacters(parseSantaList(input))).toEqual(
      12
    );
  });
});

describe('day08PartTwo', () => {
  it('returns the number of code characters minus the memory characters', () => {
    expect(encodedCharactersMinusCodeCharacters(parseSantaList(input))).toEqual(
      19
    );
  });
});

describe('getCodeLength', () => {
  test.each([
    { line: lines[0], expected: 2 },
    { line: lines[1], expected: 5 },
    { line: lines[2], expected: 10 },
    { line: lines[3], expected: 6 },
  ])(`returns the code length for $line`, ({ line, expected }) => {
    expect(getCodeLength(line)).toEqual(expected);
  });
});

describe('getMemoryLength', () => {
  test.each([
    { line: lines[0], expected: 0 },
    { line: lines[1], expected: 3 },
    { line: lines[2], expected: 7 },
    { line: lines[3], expected: 1 },
  ])(`returns the memory length for $line`, ({ line, expected }) => {
    expect(getMemoryLength(line)).toEqual(expected);
  });
});

describe('getEncodedLength', () => {
  test.each([
    { line: lines[0], expected: 6 },
    { line: lines[1], expected: 9 },
    { line: lines[2], expected: 16 },
    { line: lines[3], expected: 11 },
  ])(`returns the encoded length for $line`, ({ line, expected }) => {
    expect(getEncodedLength(line)).toEqual(expected);
  });
});
