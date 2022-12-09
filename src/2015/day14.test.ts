import { maxDistance, maxPoints, parseReindeers } from './day14';

const input = `Comment can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Cupid can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`;

describe('day14PartOne', () => {
  it('returns the max distance travelled by the reindeers after a certain period of time', () => {
    expect(maxDistance(parseReindeers(input), 1000)).toEqual(1120);
  });
});

describe('day14PartOne', () => {
  it('returns the max points scored by a reindeer after a certain period of time', () => {
    expect(maxPoints(parseReindeers(input), 1000)).toEqual(689);
  });
});
