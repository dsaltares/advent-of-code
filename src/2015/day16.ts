import { readFileSync } from 'fs';

const TARGET_SUE: Sue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

export const day16PartOne = () => findSueBasic(readSues(), TARGET_SUE);

export const day16PartTwo = () =>
  findSueActualInstructions(readSues(), TARGET_SUE);

const readSues = () => parseSues(readFileSync('data/2015/day16.txt', 'utf8'));

const parseSues = (input: string): Sue[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const matches = line
        .replace(/Sue \d+: /, '')
        .match(/(\w+): (\d+)/g) as RegExpMatchArray;
      const sue: Sue = {};
      matches.forEach((match) => {
        const [key, value] = match.split(': ');
        sue[key as keyof Sue] = parseInt(value, 10);
      });
      return sue;
    });

const findSueBasic = (sues: Sue[], target: Sue) =>
  findSue(sues, target, (s, t, k) => s[k] === t[k]);

const findSueActualInstructions = (sues: Sue[], target: Sue) =>
  findSue(sues, target, (s, t, k) => {
    const sueValue = s[k] as number;
    const targetValue = t[k] as number;
    if (k === 'cats' || k === 'trees') {
      return sueValue > targetValue;
    } else if (k === 'pomeranians' || k === 'goldfish') {
      return sueValue < targetValue;
    } else {
      return sueValue === targetValue;
    }
  });

const findSue = (sues: Sue[], sue: Sue, matchFn: MatchSuePropFn) =>
  sues.findIndex((s) =>
    Object.keys(s).every((key) => matchFn(s, sue, key as keyof Sue))
  ) + 1;

type MatchSuePropFn = (current: Sue, target: Sue, key: keyof Sue) => boolean;

type Sue = {
  children?: number;
  cats?: number;
  samoyeds?: number;
  pomeranians?: number;
  akitas?: number;
  vizslas?: number;
  goldfish?: number;
  trees?: number;
  cars?: number;
  perfumes?: number;
};
