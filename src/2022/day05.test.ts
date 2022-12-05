import {
  getTopCratesUsingCrane9000,
  getTopCratesUsingCrane9001,
  parseCrateData,
} from './day05';

const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('day05PartOne', () => {
  it('returns the top crates after performing moves', () => {
    const data = parseCrateData(input);
    const topAfterMove = getTopCratesUsingCrane9000(data);
    expect(topAfterMove).toEqual('CMZ');
  });
});

describe('day05PartTwo', () => {
  it('returns the top crates after performing moves using crane 9001', () => {
    const data = parseCrateData(input);
    const topAfterMove = getTopCratesUsingCrane9001(data);
    expect(topAfterMove).toEqual('MCD');
  });
});
