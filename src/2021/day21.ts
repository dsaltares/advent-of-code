import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

type Player = {
  score: number;
  position: number;
};

export type Game = {
  players: [Player, Player];
  die: number;
  rolls: number;
  turn: number;
};

const BoardLength = 10;

export const createGame = (data: string): Game => {
  const positions = data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line)
    .map((line) => parseInt(line.split(': ')[1], 10));

  return {
    players: positions.map((position) => ({ score: 0, position })) as [
      Player,
      Player
    ],
    die: 1,
    rolls: 0,
    turn: 0,
  };
};

const readGame = () =>
  createGame(readFileSync('./data/2021/day21.txt', 'utf-8'));

export const isFinished = (game: Game) =>
  game.players.some((player) => player.score >= 1000);

const wrap = (x: number, lowerBound: number, upperBound: number) => {
  const rangeSize = upperBound - lowerBound + 1;
  return lowerBound + ((x - lowerBound) % rangeSize);
};

export const rollDieThrice = (game: Game) => {
  let value = 0;
  for (let roll = 0; roll < 3; ++roll) {
    value += game.die;
    game.die = wrap(game.die + 1, 1, 100);
    game.rolls++;
  }
  return value;
};

export const runGame = (game: Game) => {
  const updated = cloneDeep(game);
  while (!isFinished(updated)) {
    const player = updated.players[updated.turn];
    const value = rollDieThrice(updated);
    player.position = wrap(player.position + value, 1, BoardLength);
    player.score += player.position;
    updated.turn = (updated.turn + 1) % updated.players.length;
  }
  return updated;
};

export const getLoser = (game: Game) =>
  game.players.filter((player) => player.score < 1000)[0];

const day21 = () => {
  const game = readGame();
  const finished = runGame(game);
  const loser = getLoser(finished);
  return loser.score * finished.rolls;
};

export default day21;
