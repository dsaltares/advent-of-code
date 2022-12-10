import { readFileSync } from 'fs';

export const day15PartOne = () => getBestScore(readIngredients());

export const day15PartTwo = () =>
  getBestScoreWith500Calories(readIngredients());

const readIngredients = () =>
  parseIngredients(readFileSync('./data/2015/day15.txt', 'utf-8'));

export const parseIngredients = (input: string): Ingredient[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const matches = line.match(
        /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
      ) as RegExpMatchArray;
      return {
        name: matches[1],
        capacity: parseInt(matches[2], 10),
        durability: parseInt(matches[3], 10),
        flavor: parseInt(matches[4], 10),
        texture: parseInt(matches[5], 10),
        calories: parseInt(matches[6], 10),
      };
    });

export const getBestScore = (ingredients: Ingredient[]) =>
  getBestScoreWithFilter(ingredients, () => true);

export const getBestScoreWith500Calories = (ingredients: Ingredient[]) =>
  getBestScoreWithFilter(ingredients, has500Calories);

const getBestScoreWithFilter = (
  ingredients: Ingredient[],
  filterFn: FilterFn
) =>
  generateQuantities(ingredients.length)
    .filter((quantities) => filterFn(ingredients, quantities))
    .map((quantities) => getScore(ingredients, quantities))
    .reduce((max, score) => Math.max(max, score), 0);

export const getScore = (ingredients: Ingredient[], quantities: number[]) => {
  const capacity = getPropertyScore(ingredients, quantities, 'capacity');
  const durability = getPropertyScore(ingredients, quantities, 'durability');
  const flavor = getPropertyScore(ingredients, quantities, 'flavor');
  const texture = getPropertyScore(ingredients, quantities, 'texture');
  return capacity * durability * flavor * texture;
};

const has500Calories = (ingredients: Ingredient[], quantities: number[]) =>
  getPropertyScore(ingredients, quantities, 'calories') === 500;

const getPropertyScore = (
  ingredients: Ingredient[],
  quantities: number[],
  prop: 'capacity' | 'durability' | 'flavor' | 'texture' | 'calories'
) =>
  Math.max(
    ingredients.reduce(
      (total, ingredient, index) =>
        total + ingredient[prop] * quantities[index],
      0
    ),
    0
  );

const generateQuantities = (buckets: number): number[][] => {
  const allQuantities: number[][] = [];
  generateQuantitiesHelper(buckets, [], allQuantities);
  return allQuantities;
};

const generateQuantitiesHelper = (
  buckets: number,
  quantities: number[],
  allQuantities: number[][]
) => {
  const ingredientsLeft = buckets - quantities.length;
  const spoonsLeft =
    100 - quantities.reduce((sum, quantity) => sum + quantity, 0);
  if (ingredientsLeft === 1) {
    allQuantities.push([...quantities, spoonsLeft]);
    return;
  }
  for (let i = 0; i <= spoonsLeft; i++) {
    generateQuantitiesHelper(buckets, [...quantities, i], allQuantities);
  }
};

type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

type FilterFn = (ingredients: Ingredient[], quantities: number[]) => boolean;
