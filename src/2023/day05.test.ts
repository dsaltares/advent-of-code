import {
  parseSeedData,
  getLowestLocationNumberForSeeds,
  mapIds,
  getLowestLocationNumberForSeedsPartTwo,
} from './day05';

const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

describe('mapIds', () => {
  it('maps ids correctly', () => {
    const seeds = [79, 14, 55, 13];
    const map = [
      { target: 50, source: 98, range: 2 },
      { target: 52, source: 50, range: 48 },
    ];
    const ids = mapIds(seeds, map);
    expect(ids).toEqual([81, 14, 57, 13]);
  });
});

describe('day05PartOne', () => {
  it('returns lowest location mumber for the seeds provided', () => {
    const data = parseSeedData(input);
    const num = getLowestLocationNumberForSeeds(data);
    expect(num).toEqual(35);
  });
});

describe('day05PartTwo', () => {
  it('returns lowest location mumber for the seeds provided', () => {
    const data = parseSeedData(input);
    const num = getLowestLocationNumberForSeedsPartTwo(data);
    expect(num).toEqual(46);
  });
});
