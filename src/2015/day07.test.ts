import { solve, parseInstructions } from './day07';

const input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

describe('day07PartOne', () => {
  it('returns the correct signal for each wire', () => {
    const instructions = parseInstructions(input);
    expect(solve(instructions, 'd')).toEqual(72);
    expect(solve(instructions, 'e')).toEqual(507);
    expect(solve(instructions, 'f')).toEqual(492);
    expect(solve(instructions, 'g')).toEqual(114);
    expect(solve(instructions, 'h')).toEqual(65412);
    expect(solve(instructions, 'i')).toEqual(65079);
    expect(solve(instructions, 'x')).toEqual(123);
    expect(solve(instructions, 'y')).toEqual(456);
  });
});
