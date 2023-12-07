import { readFileSync } from 'fs';

type RangeMapEntry = {
  source: number;
  target: number;
  length: number;
};

type SeedData = {
  seeds: number[];
  maps: RangeMapEntry[][];
};

export const day05PartOne = () => {
  const data = readSeedData();
  return getLowestLocationNumberForSeeds(data);
};

export const day05PartTwo = () => {
  const data = readSeedData();
  return getLowestLocationNumberForSeedsPartTwo(data);
};

const readSeedData = () =>
  parseSeedData(readFileSync('./data/2023/day05.txt', 'utf-8'));

export const parseSeedData = (input: string): SeedData => {
  const [seeds, ...maps] = input.split(/[a-z-]+ map:/gm);
  return {
    seeds: seeds
      .replace('seeds: ', '')
      .split(' ')
      .map((seed) => parseInt(seed, 10)),
    maps: maps.map(parseRangeMap),
  };
};

const parseRangeMap = (input: string): RangeMapEntry[] =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const [target, source, length] = line
        .split(' ')
        .map((num) => parseInt(num, 10));
      return { source, target, length };
    });

export const getLowestLocationNumberForSeeds = (data: SeedData) => {
  let ids = data.seeds;
  data.maps.forEach((map) => {
    ids = mapIds(ids, map);
  });
  return Math.min(...ids);
};

export const mapIds = (ids: number[], map: RangeMapEntry[]) =>
  ids.map((id) => mapId(id, map));

const mapId = (id: number, map: RangeMapEntry[]) => {
  const entry = map.find(
    (entry) => id >= entry.source && id < entry.source + entry.length
  );
  return entry ? entry.target + id - entry.source : id;
};

type Range = {
  start: number;
  length: number;
};

export const getLowestLocationNumberForSeedsPartTwo = (data: SeedData) => {
  let ranges: Range[] = [];
  for (let idx = 0; idx < data.seeds.length - 1; idx += 2) {
    ranges.push({ start: data.seeds[idx], length: data.seeds[idx + 1] });
  }
  sortRanges(ranges);

  data.maps.forEach((map) => {
    const nextRanges: Range[] = [];
    sortRangeMap(map);

    ranges.forEach((range) => {
      let { start: id, length } = range;
      while (length > 0) {
        const entry = findMapEntry(id, map);
        // The range is not mapped at all
        if (!entry) {
          nextRanges.push({ start: id, length });
          break;
        }

        // The range is fully mapped
        if (id >= entry.source && id + length <= entry.source + entry.length) {
          nextRanges.push({
            start: entry.target + id - entry.source,
            length,
          });
          break;
        }

        // The range is partially mapped
        // We need to grab the mapped portion and continue
        const mappedLength = entry.source + entry.length - id;
        nextRanges.push({
          start: entry.target,
          length: mappedLength,
        });
        id += mappedLength;
        length -= mappedLength;
      }
    });

    ranges = sortRanges(nextRanges);
  });

  sortRanges(ranges);
  return ranges[0].start;
};

const sortRanges = (ranges: Range[]) =>
  ranges.sort((a, b) => a.start - b.start);

const sortRangeMap = (map: RangeMapEntry[]) =>
  map.sort((a, b) => a.source - b.source);

const findMapEntry = (id: number, map: RangeMapEntry[]) =>
  map.find((entry) => matchesMapEntry(id, entry));

const matchesMapEntry = (id: number, entry: RangeMapEntry) =>
  id >= entry.source && id < entry.source + entry.length;
