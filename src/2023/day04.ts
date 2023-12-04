import { readFileSync } from 'fs';

type Card = {
  number: number;
  winners: Set<number>;
  hand: number[];
};

export const day04PartOne = () => {
  const cards = readCards();
  return sumCardPoints(cards);
};

export const day04PartTwo = () => {
  const cards = readCards();
  return countProcessedCards(cards);
};

const readCards = () =>
  parseCards(readFileSync('./data/2023/day04.txt', 'utf-8'));

export const parseCards = (input: string): Card[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line, index) => {
      const numbers = line.replace(/Card\s+[0-9]+:\s+/, '');
      const [winners, hand] = numbers
        .split(/\s+\|\s+/)
        .map((side) => side.split(/\s+/).map((num) => parseInt(num, 10)));
      return {
        number: index,
        winners: new Set(winners),
        hand,
      };
    });

export const sumCardPoints = (cards: Card[]) =>
  cards.reduce((acc, card) => {
    const numMatching = countMatching(card);
    return numMatching > 0 ? acc + Math.pow(2, numMatching - 1) : acc;
  }, 0);

export const countProcessedCards = (cards: Card[]) => {
  const counts = Array.from(Array(cards.length)).fill(1);
  cards.forEach((card) => {
    const numMatching = countMatching(card);
    if (numMatching > 0) {
      for (let i = card.number + 1; i < card.number + numMatching + 1; i++) {
        counts[i] += counts[card.number];
      }
    }
  });
  return counts.reduce((acc, count) => acc + count, 0);
};

const countMatching = (card: Card) =>
  card.hand.filter((num) => card.winners.has(num)).length;
