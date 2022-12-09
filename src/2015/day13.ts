import { readFileSync } from 'fs';

export const day13PartOne = () => getBestHappiness(readHappinessMap());

export const day13PartTwo = () =>
  getBestHappinessIncludingMe(readHappinessMap());

const readHappinessMap = () =>
  parseHappinessMap(readFileSync('./data/2015/day13.txt', 'utf-8'));

export const parseHappinessMap = (input: string) => {
  const happinessMap: HappinessMap = {};
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
      const matches = line.match(
        /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./
      );
      if (matches) {
        const person = matches[1];
        const sign = matches[2] === 'gain' ? 1 : -1;
        const amount = parseInt(matches[3], 10);
        const neighbor = matches[4];
        happinessMap[person] = happinessMap[person] || {};
        happinessMap[person][neighbor] = amount * sign;
      }
    });
  return happinessMap;
};

export const getBestHappiness = (happinessMap: HappinessMap) =>
  Math.max(
    ...generateSeatingPlans(happinessMap).map((plan) =>
      getHappiness(happinessMap, plan)
    )
  );

export const getBestHappinessIncludingMe = (happinessMap: HappinessMap) => {
  const happinessMapIncludingMe = includingMe(happinessMap);
  return Math.max(
    ...generateSeatingPlans(includingMe(happinessMapIncludingMe)).map((plan) =>
      getHappiness(happinessMapIncludingMe, plan)
    )
  );
};

const generateSeatingPlans = (happinessMap: HappinessMap) => {
  const plans: string[][] = [];
  Object.keys(happinessMap).forEach((person) => {
    generateSeatingPlansHelper(happinessMap, [person], plans);
  });
  return plans;
};

const generateSeatingPlansHelper = (
  happinessMap: HappinessMap,
  plan: string[],
  plans: string[][]
) => {
  const visited = new Set(plan);
  if (plan.length === Object.keys(happinessMap).length) {
    plans.push(plan);
    return;
  }
  const lastPerson = plan[plan.length - 1];
  Object.keys(happinessMap[lastPerson]).forEach((person) => {
    if (!visited.has(person)) {
      generateSeatingPlansHelper(happinessMap, [...plan, person], plans);
    }
  });
};

const getHappiness = (happinessMap: HappinessMap, plan: string[]) =>
  plan.reduce(
    (total, person, index) =>
      total +
      happinessMap[person][plan[(index + 1) % plan.length]] +
      happinessMap[person][plan[(index - 1 + plan.length) % plan.length]],
    0
  );

const includingMe = (happinessMap: HappinessMap) => {
  const people = Object.keys(happinessMap);
  const happinessMapIncludingMe: HappinessMap = {};
  people.forEach((person) => {
    happinessMapIncludingMe[person] = { ...happinessMap[person] };
    happinessMapIncludingMe[person]['Me'] = 0;
  });
  happinessMapIncludingMe['Me'] = people.reduce(
    (acc, person) => ({ ...acc, [person]: 0 }),
    {}
  );
  return happinessMapIncludingMe;
};

type HappinessMap = Record<string, Record<string, number>>;
