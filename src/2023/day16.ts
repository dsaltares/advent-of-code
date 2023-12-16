import { readFileSync } from 'fs';

export const day16PartOne = () => {
  const map = readMap();
  return traceBeamAndCountEnergized(map);
};

export const day16PartTwo = () => {
  const map = readMap();
  return getMaximumEnergy(map);
};

const readMap = () => parseMap(readFileSync('./data/2023/day16.txt', 'utf8'));

export const parseMap = (input: string): Map =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line);

export const traceBeamAndCountEnergized = (
  map: Map,
  initialBeam: Beam = createBeam({ x: 0, y: 0 }, { x: 1, y: 0 })
) => {
  const visited = new Set<string>();
  const queue: Beam[] = [initialBeam];
  while (queue.length > 0) {
    const beam = queue.pop()!;
    let done = false;

    while (!done) {
      visited.add(getKey(beam));

      const tile = map[beam.position.y][beam.position.x];
      switch (tile) {
        case '\\':
        case '/': {
          const sign = tile === '\\' ? 1 : -1;
          if (beam.direction.x !== 0) {
            beam.direction.y = beam.direction.x * sign;
            beam.direction.x = 0;
          } else if (beam.direction.y !== 0) {
            beam.direction.x = beam.direction.y * sign;
            beam.direction.y = 0;
          }
          break;
        }
        case '-': {
          if (beam.direction.y !== 0) {
            beam.direction.x = 1;
            beam.direction.y = 0;
            queue.push(createBeam(beam.position, { x: -1, y: 0 }));
          }
          break;
        }
        case '|': {
          if (beam.direction.x !== 0) {
            beam.direction.x = 0;
            beam.direction.y = 1;
            queue.push(createBeam(beam.position, { x: 0, y: -1 }));
          }
          break;
        }
      }
      beam.position.x += beam.direction.x;
      beam.position.y += beam.direction.y;

      if (!withinBounds(map, beam.position) || visited.has(getKey(beam))) {
        done = true;
        continue;
      }
    }
  }

  const positions = new Set(
    [...visited.values()].map((entry) =>
      JSON.stringify(JSON.parse(entry).position)
    )
  );

  return positions.size;
};

export const getMaximumEnergy = (map: Map) => {
  const height = map.length;
  const width = map[0].length;
  const top = Array.from(Array(width)).map((_, colIdx) =>
    createBeam({ x: colIdx, y: 0 }, { x: 0, y: 1 })
  );
  const bottom = Array.from(Array(width)).map((_, colIdx) =>
    createBeam({ x: colIdx, y: height - 1 }, { x: 0, y: -1 })
  );
  const left = Array.from(Array(height)).map((_, rowIdx) =>
    createBeam({ x: 0, y: rowIdx }, { x: 1, y: 0 })
  );
  const right = Array.from(Array(height)).map((_, rowIdx) =>
    createBeam({ x: width - 1, y: rowIdx }, { x: -1, y: 0 })
  );
  return Math.max(
    ...[top, bottom, left, right]
      .flat()
      .map((beam) => traceBeamAndCountEnergized(map, beam))
  );
};

const getKey = (beam: Beam) => JSON.stringify(beam);
const createBeam = (position: Vector2, direction: Vector2): Beam => ({
  position: { x: position.x, y: position.y },
  direction: { x: direction.x, y: direction.y },
});
const withinBounds = (map: Map, position: Vector2) => {
  const height = map.length;
  const width = map[0].length;
  return (
    position.x >= 0 &&
    position.x < width &&
    position.y >= 0 &&
    position.y < height
  );
};

type Map = string[];
type Vector2 = {
  x: number;
  y: number;
};
type Beam = {
  position: Vector2;
  direction: Vector2;
};
