import { readFileSync } from 'fs';

type RangeMapEntry = {
  source: number;
  target: number;
  range: number;
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
      const [target, source, range] = line
        .split(' ')
        .map((num) => parseInt(num, 10));
      return { source, target, range };
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
    (entry) => id >= entry.source && id < entry.source + entry.range
  );
  return entry ? entry.target + id - entry.source : id;
};

export const getLowestLocationNumberForSeedsPartTwo = (data: SeedData) => {
  let minLocation = Number.MAX_SAFE_INTEGER;

  const seeds = data.maps[0]
    .sort((a, b) => a.source - b.source)
    .map((x) => ({
      start: x.source,
      end: x.source + x.range,
      startLocation: applyMaps(x.source, data.maps),
      endLocation: applyMaps(x.source + x.range, data.maps),
    }));

  for (let i = 0; i < data.seeds.length; i += 2) {
    const start = data.seeds[i];
    const end = start + data.seeds[i + 1] - 1;
    let location = Number.MAX_SAFE_INTEGER;

    for (let j = 0; j < seeds.length; j++) {
      const overlap =
        Math.min(end, seeds[j].end) - Math.max(start, seeds[j].start);
      if (overlap >= 0) {
        const overLapStart = start >= seeds[j].start ? start : seeds[j].start;
        const overLapEnd = end <= seeds[j].end ? end : seeds[j].end;

        for (let k = overLapStart; k <= overLapEnd; k++) {
          location = applyMaps(k, data.maps);
          if (location < minLocation) {
            minLocation = location;
          }
        }

        break;
      }
    }
  }
  return minLocation;
};

const applyMaps = (id: number, maps: RangeMapEntry[][]) =>
  maps.reduce((acc, map) => mapId(acc, map), id);
