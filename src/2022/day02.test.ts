import { calculateCorrectScore, calculateScore, parseRounds } from './day02';

const input = `A Y
B X
C Z`;

describe('day02PartOne', () => {
  it('calculates the score for the sample input', () => {
    const rounds = parseRounds(input);
    const result = calculateScore(rounds);
    expect(result).toEqual(15);
  });
});

describe('day02PartTwo', () => {
  it('calculates the correct score for the sample input', () => {
    const rounds = parseRounds(input);
    const result = calculateCorrectScore(rounds);
    expect(result).toEqual(12);
  });
});
