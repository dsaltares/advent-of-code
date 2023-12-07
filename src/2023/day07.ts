import { readFileSync } from 'fs';

type CamelGame = {
  hand: string;
  bid: number;
};

export const day07PartOne = () => {
  const games = readCamelGames();
  return getTotalWinnings(games);
};

export const day07PartTwo = () => {
  const games = readCamelGames();
  return getTotalWinningsWithJoker(games);
};

const readCamelGames = () =>
  parseCamelGames(readFileSync('./data/2023/day07.txt', 'utf-8'));

export const parseCamelGames = (input: string): CamelGame[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const [hand, bid] = line.split(' ');
      return {
        hand,
        bid: parseInt(bid, 10),
      };
    });

type GameCompareFn = (a: CamelGame, b: CamelGame) => number;
const getTotalWinningsBase = (games: CamelGame[], compareFn: GameCompareFn) =>
  [...games]
    .sort(compareFn)
    .reduce((acc, game, index) => acc + game.bid * (index + 1), 0);

export const getTotalWinnings = (games: CamelGame[]) =>
  getTotalWinningsBase(games, compareCamelGames);

const HandTypeToRank = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

const CardRank = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  '9': 8,
  '8': 7,
  '7': 6,
  '6': 5,
  '5': 4,
  '4': 3,
  '3': 2,
  '2': 1,
};

const compareCamelGames = (a: CamelGame, b: CamelGame) => {
  const aRank = getHandRank(a.hand);
  const bRank = getHandRank(b.hand);

  if (aRank !== bRank) {
    return aRank - bRank;
  }

  for (let cardIdx = 0; cardIdx < 5; ++cardIdx) {
    const cardARank = CardRank[a.hand.charAt(cardIdx) as keyof typeof CardRank];
    const cardBRank = CardRank[b.hand.charAt(cardIdx) as keyof typeof CardRank];
    if (cardARank !== cardBRank) {
      return cardARank - cardBRank;
    }
  }

  return 0;
};

export const getHandRank = (hand: string) => {
  const counts = Object.values(
    hand.split('').reduce<Record<string, number>>((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {})
  ).sort();

  if (counts.length === 1) {
    return HandTypeToRank.FiveOfAKind;
  }
  if (counts.length === 2 && counts[0] === 1) {
    return HandTypeToRank.FourOfAKind;
  }
  if (counts.length === 2 && counts[0] === 2) {
    return HandTypeToRank.FullHouse;
  }
  if (counts.length === 3 && counts[0] === 1 && counts[1] === 1) {
    return HandTypeToRank.ThreeOfAKind;
  }
  if (counts.length === 3 && counts[0] === 1) {
    return HandTypeToRank.TwoPair;
  }
  if (counts.length === 4) {
    return HandTypeToRank.OnePair;
  }
  return HandTypeToRank.HighCard;
};

export const getTotalWinningsWithJoker = (games: CamelGame[]) =>
  getTotalWinningsBase(games, compareCamelGamesWithJoker);

const CardRankJoker = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
};

const compareCamelGamesWithJoker = (a: CamelGame, b: CamelGame) => {
  const aRank = getHandRankWithJoker(a.hand);
  const bRank = getHandRankWithJoker(b.hand);

  if (aRank !== bRank) {
    return aRank - bRank;
  }

  for (let cardIdx = 0; cardIdx < 5; ++cardIdx) {
    const cardARank =
      CardRankJoker[a.hand.charAt(cardIdx) as keyof typeof CardRankJoker];
    const cardBRank =
      CardRankJoker[b.hand.charAt(cardIdx) as keyof typeof CardRankJoker];
    if (cardARank !== cardBRank) {
      return cardARank - cardBRank;
    }
  }

  return 0;
};

const NonJokerCards = [
  'A',
  'K',
  'Q',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

export const getHandRankWithJoker = (hand: string) => {
  const numJokers = hand.split('').filter((card) => card === 'J').length;
  if (numJokers === 0) {
    return getHandRank(hand);
  }
  if (numJokers >= 4) {
    return HandTypeToRank.FiveOfAKind;
  }
  const handWithoutJokers = hand.replace(/J/g, '');
  const numCombinations = Math.pow(NonJokerCards.length, numJokers);
  const ranksUsingJokers = Array.from(Array(numCombinations)).map(
    (_, combinationIdx) => {
      const combination = getJokerCombination(combinationIdx, numJokers);
      const newHand = handWithoutJokers + combination;
      return getHandRank(newHand);
    }
  );
  return Math.max(...ranksUsingJokers);
};

const getJokerCombination = (combinationIdx: number, numJokers: number) =>
  Array.from(Array(numJokers))
    .map((_, jokerIdx) => {
      const cardIdx = Math.floor(
        (combinationIdx / Math.pow(NonJokerCards.length, jokerIdx)) %
          NonJokerCards.length
      );
      return NonJokerCards[cardIdx];
    })
    .join('');
