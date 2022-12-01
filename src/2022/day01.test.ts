import {
  getMostCalories,
  getMostCaloriesByTop3,
  getTotalCaloriesByElf,
  parseFoodCaloriesByElf,
} from './day01';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('day01PartOne', () => {
  it('returns the number of calories carried by the elf with the most calories', () => {
    const foodCaloriesByElf = parseFoodCaloriesByElf(input);
    const totalCaloriesByElf = getTotalCaloriesByElf(foodCaloriesByElf);
    const result = getMostCalories(totalCaloriesByElf);
    expect(result).toEqual(24000);
  });
});

describe('day01PartTwo', () => {
  it('returns the number of calories carried by the 3 elves with the most calories', () => {
    const foodCaloriesByElf = parseFoodCaloriesByElf(input);
    const totalCaloriesByElf = getTotalCaloriesByElf(foodCaloriesByElf);
    const result = getMostCaloriesByTop3(totalCaloriesByElf);
    expect(result).toEqual(45000);
  });
});
