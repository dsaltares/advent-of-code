import {
  getBestScore,
  getBestScoreWith500Calories,
  getScore,
  parseIngredients,
} from './day15';

const input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;

describe('day15PartOne', () => {
  it('returns the highest score for the best combination of the given ingredients', () => {
    expect(getBestScore(parseIngredients(input))).toEqual(62842880);
  });
});

describe('day15PartOne', () => {
  it('returns the highest score for the best combination of the given ingredients that add up to 500 calories', () => {
    expect(getBestScoreWith500Calories(parseIngredients(input))).toEqual(
      57600000
    );
  });
});

describe('getScore', () => {
  it('returns the score for the given quantities of the given ingredients', () => {
    expect(getScore(parseIngredients(input), [44, 56])).toEqual(62842880);
  });
});
