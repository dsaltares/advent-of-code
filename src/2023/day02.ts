import { readFileSync } from 'fs';

type Cube = 'red' | 'green' | 'blue';
type CubePick = {
  cube: Cube;
  number: number;
};
type GameSet = CubePick[];
type Game = GameSet[];
type CubeBag = {
  red: number;
  green: number;
  blue: number;
};

export const day02PartOne = () => {
  const games = readGames();
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };
  return sumPossibleGameNumbers(games, bag);
};

export const day02PartTwo = () => {
  const games = readGames();
  return sumCubesPower(games);
};

const readGames = () =>
  parseGames(readFileSync('./data/2023/day02.txt', 'utf-8'));

export const parseGames = (input: string): Game[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) =>
      line
        .replace(/Game [0-9]+: /, '')
        .split('; ')
        .map((set) =>
          set.split(', ').map((pick) => {
            const [number, cube] = pick.split(' ');
            return { cube: cube as Cube, number: parseInt(number, 10) };
          })
        )
    );

export const sumPossibleGameNumbers = (games: Game[], bag: CubeBag) =>
  games.reduce(
    (acc, game, index) => (isPossibleGame(game, bag) ? acc + index + 1 : acc),
    0
  );

const isPossibleGame = (game: Game, bag: CubeBag) =>
  game.every((set) => set.every((pick) => bag[pick.cube] >= pick.number));

export const sumCubesPower = (games: Game[]) =>
  games.reduce((acc, game) => acc + getCubesPower(game), 0);

const getCubesPower = (game: Game) => {
  const colors = ['red', 'green', 'blue'] as const;
  const powers = colors.map((color) =>
    Math.max(
      ...game.map((set) => {
        const pick = set.find((pick) => pick.cube === color);
        return pick ? pick.number : 0;
      })
    )
  );
  return powers.reduce((acc, power) => acc * power, 1);
};
