import { isNice, isNiceV2 } from './day05';

describe('day05PartOne', () => {
  test.each([
    { str: 'ugknbfddgicrmopn', expected: true },
    { str: 'aaa', expected: true },
    { str: 'jchzalrnumimnmhp', expected: false },
    { str: 'haegwjzuvuyypxyu', expected: false },
    { str: 'dvszwmarrgswjxmb', expected: false },
  ])('detects whether $str is nice', ({ str, expected }) => {
    expect(isNice(str)).toEqual(expected);
  });
});

describe('day05PartTwo', () => {
  test.each([
    // { str: 'qjhvhtzxzqqjkmpb', expected: true },
    { str: 'xxyxx', expected: true },
    // { str: 'uurcxstgmygtbstg', expected: false },
    // { str: 'ieodomkazucvgmuy', expected: false },
  ])('detects whether $str is nice', ({ str, expected }) => {
    expect(isNiceV2(str)).toEqual(expected);
  });
});
