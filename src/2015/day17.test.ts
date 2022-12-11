import {
  countCombinations,
  countCombinationsWithMinimumNumberOfContainers,
  parseContainers,
} from './day17';

const input = `20
15
10
5
5`;

describe('day17PartOne', () => {
  it('returns the number of combinations of containers that can hold exactly 25 liters', () => {
    expect(countCombinations(parseContainers(input), 25)).toEqual(4);
  });
});

describe('day17PartTwo', () => {
  it('returns the number of combinations with the minumum set of containers that hold exactly 25 liters', () => {
    expect(
      countCombinationsWithMinimumNumberOfContainers(parseContainers(input), 25)
    ).toEqual(3);
  });
});
