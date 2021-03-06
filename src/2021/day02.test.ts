import {
  getPositionAfterCommands,
  applyCommand,
  applyCommandWithAim,
  Command,
} from './day02';

describe('getPositionAfterCommands', () => {
  it('returns initial position after 0 commands', () => {
    const commands: Command[] = [];
    const position = getPositionAfterCommands(commands, applyCommand);
    expect(position).toEqual({
      horizontal: 0,
      depth: 0,
      aim: 0,
    });
  });

  it('returns position after moving horizontally and up', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 4,
      },
      {
        direction: 'up',
        amount: 2,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommand);
    expect(position).toEqual({
      horizontal: 4,
      depth: -2,
      aim: 0,
    });
  });

  it('returns position after moving horizontally and down', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 1,
      },
      {
        direction: 'down',
        amount: 3,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommand);
    expect(position).toEqual({
      horizontal: 1,
      depth: 3,
      aim: 0,
    });
  });

  it('returns position after combined movement', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 1,
      },
      {
        direction: 'down',
        amount: 4,
      },
      {
        direction: 'forward',
        amount: 2,
      },
      {
        direction: 'up',
        amount: 3,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommand);
    expect(position).toEqual({
      horizontal: 3,
      depth: 1,
      aim: 0,
    });
  });
});

describe('getPositionAfterCommands with aim', () => {
  it('returns initial position after 0 commands', () => {
    const commands: Command[] = [];
    const position = getPositionAfterCommands(commands, applyCommandWithAim);
    expect(position).toEqual({
      horizontal: 0,
      depth: 0,
      aim: 0,
    });
  });

  it('returns position after moving horizontally and up', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 4,
      },
      {
        direction: 'up',
        amount: 2,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommandWithAim);
    expect(position).toEqual({
      horizontal: 4,
      depth: 0,
      aim: -2,
    });
  });

  it('returns position after moving horizontally and down', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 1,
      },
      {
        direction: 'down',
        amount: 3,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommandWithAim);
    expect(position).toEqual({
      horizontal: 1,
      depth: 0,
      aim: 3,
    });
  });

  it('returns position after combined movement', () => {
    const commands: Command[] = [
      {
        direction: 'forward',
        amount: 1,
      },
      {
        direction: 'down',
        amount: 4,
      },
      {
        direction: 'forward',
        amount: 2,
      },
      {
        direction: 'up',
        amount: 3,
      },
    ];
    const position = getPositionAfterCommands(commands, applyCommandWithAim);
    expect(position).toEqual({
      horizontal: 3,
      depth: 8,
      aim: 1,
    });
  });
});
