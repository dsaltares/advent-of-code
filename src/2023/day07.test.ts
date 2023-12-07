import {
  getHandRank,
  getHandRankWithJoker,
  getTotalWinnings,
  getTotalWinningsWithJoker,
  parseCamelGames,
} from './day07';

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

describe('getHandRank', () => {
  test.each([
    { hand: '32T3K', expected: 2 },
    { hand: 'T55J5', expected: 4 },
    { hand: 'KK677', expected: 3 },
    { hand: 'KTJJT', expected: 3 },
    { hand: 'QQQJA', expected: 4 },
  ])(`returns the correct rank for $hand`, ({ hand, expected }) => {
    expect(getHandRank(hand)).toEqual(expected);
  });
});

describe('day07PartOne', () => {
  it('returns the total winnings', () => {
    const games = parseCamelGames(input);
    const total = getTotalWinnings(games);
    expect(total).toEqual(6440);
  });
});

describe('getHandRankWithJoker', () => {
  test.each([
    { hand: '32T3K', expected: 2 },
    { hand: 'T55J5', expected: 6 },
    { hand: 'KK677', expected: 3 },
    { hand: 'KTJJT', expected: 6 },
    { hand: 'QQQJA', expected: 6 },
  ])(
    `returns the correct rank for $hand using jokers`,
    ({ hand, expected }) => {
      expect(getHandRankWithJoker(hand)).toEqual(expected);
    }
  );
});

describe('day07PartTwo', () => {
  it('returns the total winnings using joker cards', () => {
    const games = parseCamelGames(input);
    const total = getTotalWinningsWithJoker(games);
    expect(total).toEqual(5905);
  });
});
