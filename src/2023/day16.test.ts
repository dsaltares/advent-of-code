import { readFileSync } from 'fs';
import {
  getMaximumEnergy,
  parseMap,
  traceBeamAndCountEnergized,
} from './day16';

const input = readFileSync('./data/2023/day16-example.txt', 'utf8');

describe('day16PartOne', () => {
  it('returns the number of energized points', () => {
    const map = parseMap(input);
    const count = traceBeamAndCountEnergized(map);
    expect(count).toEqual(46);
  });
});

describe('day16PartTwo', () => {
  it('returns the number of energized points', () => {
    const map = parseMap(input);
    const energy = getMaximumEnergy(map);
    expect(energy).toEqual(51);
  });
});
