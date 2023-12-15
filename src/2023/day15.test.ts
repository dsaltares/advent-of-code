import {
  getHash,
  parseSequence,
  runSequenceAndGetFocusPower,
  sumHashes,
} from './day15';

describe('getHash', () => {
  test.each([
    { step: 'rn=1', expected: 30 },
    { step: 'cm-', expected: 253 },
    { step: 'qp=3', expected: 97 },
    { step: 'cm=2', expected: 47 },
    { step: 'qp-', expected: 14 },
    { step: 'pc=4', expected: 180 },
    { step: 'ot=9', expected: 9 },
    { step: 'ab=5', expected: 197 },
    { step: 'pc-', expected: 48 },
    { step: 'pc=6', expected: 214 },
    { step: 'ot=7', expected: 231 },
  ])(`returns the hash for $step`, ({ step, expected }) => {
    expect(getHash(step)).toEqual(expected);
  });
});

const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';

describe('day15PartOne', () => {
  it('returns the sum of hashes', () => {
    const sequence = parseSequence(input);
    const sum = sumHashes(sequence);
    expect(sum).toEqual(1320);
  });
});

describe('day15PartTwo', () => {
  it('runs the sequence and returns the total focus power', () => {
    const sequence = parseSequence(input);
    const focus = runSequenceAndGetFocusPower(sequence);
    expect(focus).toEqual(145);
  });
});
