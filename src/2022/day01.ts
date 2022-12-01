import { readFileSync } from 'fs';

export const day01PartOne = () => {
  const foodCaloriesByElf = readFoodCaloriesByElf();
  const totalCaloriesByElf = getTotalCaloriesByElf(foodCaloriesByElf);
  return getMostCalories(totalCaloriesByElf);
};

export const day01PartTwo = () => {
  const foodCaloriesByElf = readFoodCaloriesByElf();
  const totalCaloriesByElf = getTotalCaloriesByElf(foodCaloriesByElf);
  return getMostCaloriesByTop3(totalCaloriesByElf);
};

const readFoodCaloriesByElf = () =>
  parseFoodCaloriesByElf(readFileSync('./data/2022/day01.txt', 'utf-8'));

export const parseFoodCaloriesByElf = (input: string) =>
  input.split('\n\n').map((block) =>
    block
      .split('\n')
      .filter((line) => !!line)
      .map((line) => parseInt(line.trimStart().trimEnd()))
  );

export const getTotalCaloriesByElf = (foodCaloriesByElf: number[][]) =>
  foodCaloriesByElf.map((foodCalories) =>
    foodCalories.reduce((total, calories) => total + calories, 0)
  );

export const getMostCalories = (caloriesByElf: number[]) =>
  caloriesByElf.sort(desc)[0];

export const getMostCaloriesByTop3 = (caloriesByElf: number[]) =>
  caloriesByElf
    .sort(desc)
    .slice(0, 3)
    .reduce((total, calories) => total + calories, 0);

const desc = (a: number, b: number) => b - a;
