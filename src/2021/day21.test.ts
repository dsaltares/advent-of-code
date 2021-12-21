import {
  createPlayers,
  isFinished,
  runGame,
  runQuantumGame,
  QuantumGame,
  Game,
} from './day21';

describe('createPlayers', () => {
  it('returns correct game from sample input', () => {
    const data = `
      Player 1 starting position: 4
      Player 2 starting position: 8
    `;
    const players = createPlayers(data);

    expect(players).toEqual([
      { position: 4, score: 0 },
      { position: 8, score: 0 },
    ]);
  });
});

describe('isFinished', () => {
  it('returns false when both players are below 1000', () => {
    const game: Game = {
      players: [
        { position: 4, score: 100 },
        { position: 8, score: 999 },
      ],
      die: 1,
      rolls: 0,
      turn: 0,
    };
    const finished = isFinished(game);

    expect(finished).toEqual(false);
  });

  it('returns true when one players is at 1000', () => {
    const game: Game = {
      players: [
        { position: 4, score: 1000 },
        { position: 8, score: 999 },
      ],
      die: 1,
      rolls: 0,
      turn: 0,
    };
    const finished = isFinished(game);

    expect(finished).toEqual(true);
  });

  it('returns true when one players is above 1000', () => {
    const game: Game = {
      players: [
        { position: 4, score: 999 },
        { position: 8, score: 1005 },
      ],
      die: 1,
      rolls: 0,
      turn: 0,
    };
    const finished = isFinished(game);

    expect(finished).toEqual(true);
  });
});

describe('runGame', () => {
  it('correctly runs the sample game', () => {
    const game: Game = {
      players: [
        { position: 4, score: 0 },
        { position: 8, score: 0 },
      ],
      die: 1,
      rolls: 0,
      turn: 0,
    };
    const finished = runGame(game);

    expect(finished).toEqual({
      players: [
        { position: 10, score: 1000 },
        { position: 3, score: 745 },
      ],
      die: 94,
      rolls: 993,
      turn: 1,
    });
  });
});

describe('runQuantumGame', () => {
  it('correctly runs the sample game in quantum mode', () => {
    const game: QuantumGame = [4, 8, 0, 0, 0];
    const wins = runQuantumGame(game);

    expect(wins).toEqual([444356092776315, 341960390180808]);
  });
});
