import {
  getBadges,
  getMisplacedItems,
  getPrioritySum,
  parseBackpacks,
} from './day03';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe('day03PartOne', () => {
  it('calculates the sum of priorities for misplaced items', () => {
    const backpacks = parseBackpacks(input);
    const misplaced = getMisplacedItems(backpacks);
    const sum = getPrioritySum(misplaced);
    expect(sum).toEqual(157);
  });
});

describe('day03PartTwo', () => {
  it('calculates the sum of priorities for badges', () => {
    const backpacks = parseBackpacks(input);
    const badges = getBadges(backpacks);
    const sum = getPrioritySum(badges);
    expect(sum).toEqual(70);
  });
});
