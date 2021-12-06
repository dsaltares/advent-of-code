import { numberOfLanternFishAfterDays } from './day06';

describe('numberOfLanternFishAfterDays', () => {
  const fish = [3, 4, 3, 1, 2];
  const tests = [
    { days: 18, expected: 26 },
    { days: 80, expected: 5934 },
    { days: 256, expected: 26984457539 },
  ];

  tests.forEach(({ days, expected }) => {
    it(`returns correct number of lantern fish after ${days}`, () => {
      const number = numberOfLanternFishAfterDays(fish, days);

      expect(number).toEqual(expected);
    });
  });
});
