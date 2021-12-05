import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

export type Board = {
  numbers: number[][];
  marked: boolean[][];
};

export type Game = {
  numbers: number[];
  boards: Board[];
};

export type GameResult = {
  winner: Board;
  lastNumber: number;
};

const createBoard = (lines: string[]): Board => ({
  numbers: lines.map((line) =>
    line
      .split(' ')
      .filter((number) => !!number)
      .map((number) => parseInt(number, 10))
  ),
  marked: Array.from(Array(5).keys()).map(() =>
    Array.from(Array(5).keys()).map(() => false)
  ),
});

export const createGame = (lines: string[]) => {
  const game: Game = {
    numbers: [],
    boards: [],
  };

  game.numbers = lines[0].split(',').map((number) => parseInt(number, 10));

  for (let idx = 1; idx < lines.length; idx += 5) {
    game.boards.push(createBoard(lines.slice(idx, idx + 5)));
  }

  return game;
};

const getGame = () => {
  const lines = readFileSync('./data/day04.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line);

  return createGame(lines);
};

const markNumberOnBoard = (board: Board, number: number) => {
  board.numbers.forEach((line, lineIdx) => {
    line.forEach((current, colIdx) => {
      if (current === number) {
        board.marked[lineIdx][colIdx] = true;
      }
    });
  });
};

const getWinner = (game: Game) => {
  return game.boards.filter((board) => {
    const hasLine = board.marked.some((line) => line.every((mark) => !!mark));
    const hasColumn = Array.from(Array(5).keys()).some((colIdx) =>
      board.marked.every((line) => !!line[colIdx])
    );
    return hasLine || hasColumn;
  })[0];
};

export const getResult = (game: Game): GameResult => {
  const current = cloneDeep(game);
  let winner: Board | undefined = undefined;
  let lastNumber: number | undefined;
  let turn = 0;
  while (!winner && turn < current.numbers.length) {
    lastNumber = current.numbers[turn];
    current.boards.forEach((board) =>
      markNumberOnBoard(board, lastNumber as number)
    );
    winner = getWinner(current);
    turn += 1;
  }

  return {
    winner: winner as Board,
    lastNumber: lastNumber as number,
  };
};

export const getScore = (result: GameResult) => {
  let unMarkedSum = 0;
  result.winner.numbers.forEach((line, lineIdx) =>
    line.forEach((number, colIdx) => {
      const marked = result.winner.marked[lineIdx][colIdx];
      if (!marked) {
        unMarkedSum += number;
      }
    })
  );
  return unMarkedSum * result.lastNumber;
};

const day04 = () => {
  const game = getGame();
  const result = getResult(game);
  const score = getScore(result);
  return score;
};

export default day04;
