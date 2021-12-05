import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

export type Board = {
  numbers: number[][];
  marked: boolean[][];
  winningTurn?: number;
};

export type Game = {
  numbers: number[];
  boards: Board[];
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

const isWinner = (board: Board) => {
  const hasLine = board.marked.some((line) => line.every((mark) => !!mark));
  const hasColumn = Array.from(Array(5).keys()).some((colIdx) =>
    board.marked.every((line) => !!line[colIdx])
  );
  return hasLine || hasColumn;
};

const markNumberOnBoard = (board: Board, number: number, turn: number) => {
  board.numbers.forEach((line, lineIdx) => {
    line.forEach((current, colIdx) => {
      if (current === number) {
        board.marked[lineIdx][colIdx] = true;
      }
    });
  });
  if (isWinner(board)) {
    board.winningTurn = turn;
  }
};

const getCurrentWinner = (game: Game) => {
  return game.boards.filter((board) => board.winningTurn !== undefined)[0];
};

export const getWinningBoard = (game: Game): Board | undefined => {
  const current = cloneDeep(game);
  let lastNumber: number | undefined;
  let turn = 0;
  while (turn < current.numbers.length) {
    lastNumber = current.numbers[turn];
    current.boards.forEach((board) =>
      markNumberOnBoard(board, lastNumber as number, turn)
    );

    const winner = getCurrentWinner(current);
    if (winner) {
      return winner;
    }

    turn += 1;
  }
};

export const getLosingBoard = (game: Game): Board | undefined => {
  const current = cloneDeep(game);
  let lastNumber: number | undefined;
  let losingBoards: Board[] = current.boards;
  let turn = 0;
  while (turn < current.numbers.length) {
    lastNumber = current.numbers[turn];

    losingBoards.forEach((board) =>
      markNumberOnBoard(board, lastNumber as number, turn)
    );

    const newLosingBoards = losingBoards.filter(
      (board) => board.winningTurn === undefined
    );

    if (newLosingBoards.length === 0) {
      return losingBoards[0];
    }

    losingBoards = newLosingBoards;
    turn += 1;
  }
};

export const getScore = (board: Board, numbers: number[]) => {
  let unMarkedSum = 0;
  board.numbers.forEach((line, lineIdx) =>
    line.forEach((number, colIdx) => {
      const marked = board.marked[lineIdx][colIdx];
      if (!marked) {
        unMarkedSum += number;
      }
    })
  );
  return unMarkedSum * numbers[board.winningTurn as number];
};

const day04 = () => {
  const game = getGame();
  const winner = getWinningBoard(game);
  const score = getScore(winner as Board, game.numbers);
  return score;
};

export const day04PartTwo = () => {
  const game = getGame();
  const loser = getLosingBoard(game);
  const score = getScore(loser as Board, game.numbers);
  return score;
};

export default day04;
