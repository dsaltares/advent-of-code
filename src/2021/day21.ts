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

// p1 pos, p2 pos, p1 score, p2 score, turn
export type QuantumGame = [number, number, number, number, number];

export type WinCounts = [number, number];

const BoardLength = 10;
const DieSides = 100;
const WinningScore = 1000;
const QuantumWinningScore = 21;
const ScoreP1Idx = 2;
const ScoreP2Idx = 3;
const TurnIdx = 4;

const DiceDistribution: Record<number, number> = {
  3: 1, // 111
  4: 3, // 112, 121, 211
  5: 6, // 113, 131, 311, 122, 212, 221
  6: 7, // 123, 132, 213, 231, 312, 321, 222
  7: 6, // 223, 232, 322, 133, 313, 331
  8: 3, // 233, 323, 332
  9: 1, // 333
};

export const createPlayers = (data: string): [Player, Player] =>
  data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line)
    .map((line) => ({
      position: parseInt(line.split(': ')[1], 10),
      score: 0,
    })) as [Player, Player];

const readPlayers = () =>
  createPlayers(readFileSync('./data/2021/day21.txt', 'utf-8'));

export const isFinished = (game: Game) =>
  game.players.some((player) => player.score >= WinningScore);

const wrap = (x: number, lowerBound: number, upperBound: number) => {
  const rangeSize = upperBound - lowerBound + 1;
  return lowerBound + ((x - lowerBound) % rangeSize);
};

export const rollDieThrice = (game: Game) => {
  let value = 0;
  for (let roll = 0; roll < 3; ++roll) {
    value += game.die;
    game.die = wrap(game.die + 1, 1, DieSides);
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
  game.players.filter((player) => player.score < WinningScore)[0];

const range = (from: number, to: number) =>
  Array.from(Array(to - from)).map((_, idx) => idx + from);

export const runQuantumGame = (game: QuantumGame): WinCounts => {
  const cache = new Map<string, WinCounts>();

  const getKey = (game: QuantumGame) => game.join(':');

  const roll = (current: QuantumGame, value: number): QuantumGame => {
    const positionIdx = current[TurnIdx];
    const scoreIdx = current[TurnIdx] === 0 ? ScoreP1Idx : ScoreP2Idx;
    const updated = [...current] as QuantumGame;
    updated[positionIdx] = wrap(updated[positionIdx] + value, 1, BoardLength);
    updated[scoreIdx] += updated[positionIdx];
    updated[TurnIdx] = (updated[TurnIdx] + 1) % 2;
    return updated;
  };

  const play = (current: QuantumGame): WinCounts => {
    const key = getKey(current);
    if (cache.has(key)) {
      return cache.get(key) as WinCounts;
    }
    if (current[ScoreP1Idx] >= QuantumWinningScore) {
      return [1, 0];
    }
    if (current[ScoreP2Idx] >= QuantumWinningScore) {
      return [0, 1];
    }

    const results = range(3, 10)
      .map((dieValue) => {
        const dieFreq = DiceDistribution[dieValue];
        const wins = play(roll(current, dieValue));
        return [wins[0] * dieFreq, wins[1] * dieFreq];
      })
      .reduce(
        (acc, wins) => [acc[0] + wins[0], acc[1] + wins[1]],
        [0, 0]
      ) as WinCounts;

    cache.set(key, results);
    return results;
  };

  return play(game);
};

const day21 = () => {
  const players = readPlayers();
  const game: Game = {
    players,
    die: 1,
    rolls: 0,
    turn: 0,
  };
  const finished = runGame(game);
  const loser = getLoser(finished);
  return loser.score * finished.rolls;
};

export const day21PartTwo = () => {
  const players = readPlayers();
  const game: QuantumGame = [players[0].position, players[1].position, 0, 0, 0];
  const wins = runQuantumGame(game);
  return Math.max(...wins);
};

export default day21;
