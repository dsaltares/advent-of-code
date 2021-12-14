import { readFileSync } from 'fs';

type State = {
  template: string;
  rules: Record<string, string>;
};

const readPolymerState = (): State => {
  const lines = readFileSync('./data/2021/day14.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line);
  return {
    template: lines[0],
    rules: lines.slice(1).reduce((acc, line) => {
      const [pair, insert] = line.split(' -> ');
      return { ...acc, [pair]: insert };
    }, {}),
  };
};

export const runPolymerStep = (state: State) => {
  let template = state.template[0];
  for (let i = 1; i < state.template.length; ++i) {
    const first = state.template[i - 1];
    const second = state.template[i];
    const pair = `${first}${second}`;
    const insert = state.rules[pair];
    if (insert) {
      template = `${template}${insert}${second}`;
    } else {
      template = `${template}${second}`;
    }
  }
  return {
    template,
    rules: state.rules,
  };
};

export const runPolymerSteps = (state: State, steps: number) => {
  let newState = state;
  for (let step = 0; step < steps; ++step) {
    newState = runPolymerStep(newState);
  }
  return newState;
};

export const getMostAndLeastCommonLetter = (state: State) => {
  const countMap = [...state.template].reduce(
    (acc, current) => ({
      ...acc,
      [current]: (acc[current] || 0) + 1,
    }),
    {} as Record<string, number>
  );
  const max = Math.max(...Object.values(countMap));
  const min = Math.min(...Object.values(countMap));
  return {
    max,
    min,
  };
};

export const getTemplateCommonalityAfterSteps = (
  state: State,
  steps: number
) => {
  const letters = [
    ...new Set(
      Object.entries(state.rules).flatMap(([pair, insert]) => [
        insert,
        ...pair.split(''),
      ])
    ),
  ];
  const letterCounts = Object.fromEntries(letters.map((x) => [x, 0]));
  const pairCombinations = letters.flatMap((a) => letters.map((b) => a + b));
  const pairCounts = Object.fromEntries(pairCombinations.map((x) => [x, 0]));

  state.template.split('').forEach((char, i, templateArray) => {
    letterCounts[char]++;
    if (i < templateArray.length - 1) {
      pairCounts[char + templateArray[i + 1]]++;
    }
  });

  for (let step = 0; step < steps; step++) {
    for (const [pair, count] of Object.entries(pairCounts)) {
      const insert = state.rules[pair];
      letterCounts[insert] += count;
      pairCounts[pair] -= count;
      const newPairs = [`${pair[0]}${insert}`, `${insert}${pair[1]}`];
      newPairs.forEach((newPair) => (pairCounts[newPair] += count));
    }
  }

  const letterCountsAscending = Object.entries(letterCounts)
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count);
  const max = letterCountsAscending[0].count;
  const min = letterCountsAscending[letterCountsAscending.length - 1].count;

  return { max, min };
};

const day14 = () => {
  const state = readPolymerState();
  const newState = runPolymerSteps(state, 10);
  const commonality = getMostAndLeastCommonLetter(newState);
  return commonality.max - commonality.min;
};

export const day14PartTwo = () => {
  const state = readPolymerState();
  const commonality = getTemplateCommonalityAfterSteps(state, 40);
  return commonality.max - commonality.min;
};

export default day14;
