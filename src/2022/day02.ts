import { readFileSync } from 'fs';

type FirstPlayer = 'A' | 'B' | 'C';
type SecondPlayer = 'X' | 'Y' | 'Z';
type Player = FirstPlayer | SecondPlayer;
type Round = [FirstPlayer, SecondPlayer];

const Scores: Record<Player, number> = {
  X: 1,
  A: 1,
  Y: 2,
  B: 2,
  Z: 3,
  C: 3,
};

const WinMap: Record<Player, Player> = {
  X: 'C',
  Y: 'A',
  Z: 'B',
  A: 'Z',
  B: 'X',
  C: 'Y',
};

const LoseMap: Record<Player, Player> = {
  X: 'B',
  Y: 'C',
  Z: 'A',
  A: 'Y',
  B: 'Z',
  C: 'X',
};

const DrawMap: Record<Player, Player> = {
  X: 'A',
  Y: 'B',
  Z: 'C',
  A: 'X',
  B: 'Y',
  C: 'Z',
};

export const day02PartOne = () => {
  const rounds = readRounds();
  return calculateScore(rounds);
};

export const day02PartTwo = () => {
  const rounds = readRounds();
  return calculateCorrectScore(rounds);
};

const readRounds = () =>
  parseRounds(readFileSync('./data/2022/day02.txt', 'utf-8'));

export const parseRounds = (input: string) =>
  input
    .split('\n')
    .filter((line) => !!line.trimEnd().trimStart())
    .map((line) => line.split(' ') as Round);

export const calculateScore = (rounds: Round[]) =>
  rounds.map(getRoundScore).reduce((total, score) => total + score, 0);

const getRoundScore = ([elf, you]: Round) => {
  let winScore = 0;
  if (DrawMap[you] === elf) {
    winScore = 3;
  } else if (WinMap[you] === elf) {
    winScore = 6;
  }

  return Scores[you] + winScore;
};

export const calculateCorrectScore = (rounds: Round[]) =>
  rounds.map(getCorrectRoundScore).reduce((total, score) => total + score, 0);

const getCorrectRoundScore = ([elf, you]: Round) => {
  let playScore = 0;
  let winScore = 0;
  switch (you) {
    case 'X':
      winScore = 0;
      playScore = Scores[WinMap[elf]];
      break;
    case 'Y':
      winScore = 3;
      playScore = Scores[elf];
      break;
    case 'Z':
      winScore = 6;
      playScore = Scores[LoseMap[elf]];
      break;
  }
  return winScore + playScore;
};
