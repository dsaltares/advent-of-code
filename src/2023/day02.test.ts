import { parseGames, sumCubesPower, sumPossibleGameNumbers } from './day02';

const input = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

describe('day02PartOne', () => {
  it('returns the sum of the possible game numbers', () => {
    const games = parseGames(input);
    const bag = {
      red: 12,
      green: 13,
      blue: 14,
    };
    const sum = sumPossibleGameNumbers(games, bag);
    expect(sum).toEqual(8);
  });
});

describe('day02PartTwo', () => {
  it('returns the sum of the cube power for each game', () => {
    const games = parseGames(input);
    const sum = sumCubesPower(games);
    expect(sum).toEqual(2286);
  });
});
