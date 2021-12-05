import { createGame, GameResult, getScore, getResult, Game } from './day04';

describe('createGame', () => {
  it('creates correct game from input', () => {
    const lines = [
      '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',
      '22 13 17 11  0',
      '8  2 23  4 24',
      '21  9 14 16  7',
      '6 10  3 18  5',
      '1 12 20 15 19',
      '3 15  0  2 22',
      '9 18 13 17  5',
      '19  8  7 25 23',
      '20 11 10 24  4',
      '14 21 16 12  6',
      '14 21 17 24  4',
      '10 16 15  9 19',
      '18  8 23 26 20',
      '22 11 13  6  5',
      '2  0 12  3  7',
    ];

    const game = createGame(lines);

    expect(game.numbers).toEqual([
      7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
      18, 20, 8, 19, 3, 26, 1,
    ]);

    expect(game.boards[0]).toEqual({
      numbers: [
        [22, 13, 17, 11, 0],
        [8, 2, 23, 4, 24],
        [21, 9, 14, 16, 7],
        [6, 10, 3, 18, 5],
        [1, 12, 20, 15, 19],
      ],
      marked: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
    });

    expect(game.boards[1]).toEqual({
      numbers: [
        [3, 15, 0, 2, 22],
        [9, 18, 13, 17, 5],
        [19, 8, 7, 25, 23],
        [20, 11, 10, 24, 4],
        [14, 21, 16, 12, 6],
      ],
      marked: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
    });

    expect(game.boards[2]).toEqual({
      numbers: [
        [14, 21, 17, 24, 4],
        [10, 16, 15, 9, 19],
        [18, 8, 23, 26, 20],
        [22, 11, 13, 6, 5],
        [2, 0, 12, 3, 7],
      ],
      marked: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
    });
  });
});

describe('getResult', () => {
  it('returns correct GameResult for a Game', () => {
    const game: Game = {
      numbers: [
        7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22,
        18, 20, 8, 19, 3, 26, 1,
      ],
      boards: [
        {
          numbers: [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19],
          ],
          marked: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
        {
          numbers: [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6],
          ],
          marked: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
        {
          numbers: [
            [14, 21, 17, 24, 4],
            [10, 16, 15, 9, 19],
            [18, 8, 23, 26, 20],
            [22, 11, 13, 6, 5],
            [2, 0, 12, 3, 7],
          ],
          marked: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
      ],
    };

    const result = getResult(game);

    expect(result).toEqual({
      winner: {
        numbers: [
          [14, 21, 17, 24, 4],
          [10, 16, 15, 9, 19],
          [18, 8, 23, 26, 20],
          [22, 11, 13, 6, 5],
          [2, 0, 12, 3, 7],
        ],
        marked: [
          [true, true, true, true, true],
          [false, false, false, true, false],
          [false, false, true, false, false],
          [false, true, false, false, true],
          [true, true, false, false, true],
        ],
      },
      lastNumber: 24,
    });
  });
});

describe('getScore', () => {
  it('returns the correct score from the game result', () => {
    const result: GameResult = {
      winner: {
        numbers: [
          [14, 21, 17, 24, 4],
          [10, 16, 15, 9, 19],
          [18, 8, 23, 26, 20],
          [22, 11, 13, 6, 5],
          [2, 0, 12, 3, 7],
        ],
        marked: [
          [true, true, true, true, true],
          [false, false, false, true, false],
          [false, false, true, false, false],
          [false, true, false, false, true],
          [true, true, false, false, true],
        ],
      },
      lastNumber: 24,
    };
    const score = getScore(result);

    expect(score).toEqual(4512);
  });
});
