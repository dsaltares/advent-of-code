import { getNumGhostSteps, getNumStepsToExit, parseNetwork } from './day08';

describe('day08PartOne', () => {
  it('returns the number of steps to reach the exit', () => {
    const input = `
    LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)
    `;

    const network = parseNetwork(input);
    const num = getNumStepsToExit(network);
    expect(num).toEqual(6);
  });
});

describe('day08PartTwo', () => {
  it('returns the number of steps to reach the exit', () => {
    const input = `
    LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)
    `;

    const network = parseNetwork(input);
    const num = getNumGhostSteps(network);
    expect(num).toEqual(6);
  });
});
