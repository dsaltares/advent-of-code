import {
  createVentSegments,
  getMapSize,
  initializeDangerMap,
  generateDangerMap,
  numberOfDangerousPoints,
  isHorizontalVerticalOr45Degrees,
  Segment,
  DangerMap,
} from './day05';

const segments: Segment[] = [
  {
    start: { x: 0, y: 9 },
    end: { x: 5, y: 9 },
  },
  {
    start: { x: 8, y: 0 },
    end: { x: 0, y: 8 },
  },
  {
    start: { x: 9, y: 4 },
    end: { x: 3, y: 4 },
  },
  {
    start: { x: 2, y: 2 },
    end: { x: 2, y: 1 },
  },
  {
    start: { x: 7, y: 0 },
    end: { x: 7, y: 4 },
  },
  {
    start: { x: 6, y: 4 },
    end: { x: 2, y: 0 },
  },
  {
    start: { x: 0, y: 9 },
    end: { x: 2, y: 9 },
  },
  {
    start: { x: 3, y: 4 },
    end: { x: 1, y: 4 },
  },
  {
    start: { x: 0, y: 0 },
    end: { x: 8, y: 8 },
  },
  {
    start: { x: 5, y: 5 },
    end: { x: 8, y: 2 },
  },
];

const dangerMap: DangerMap = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
];

describe('createVentSegments', () => {
  it('returns vent segments from file data', () => {
    const rows = [
      '0,9 -> 5,9',
      '8,0 -> 0,8',
      '9,4 -> 3,4',
      '2,2 -> 2,1',
      '7,0 -> 7,4',
      '6,4 -> 2,0',
      '0,9 -> 2,9',
      '3,4 -> 1,4',
      '0,0 -> 8,8',
      '5,5 -> 8,2',
    ];

    const result = createVentSegments(rows);

    expect(result).toEqual(segments);
  });
});

describe('getMapSize', () => {
  it('returns correct map size from segments', () => {
    const size = getMapSize(segments);

    expect(size).toEqual({
      height: 10,
      width: 10,
    });
  });
});

describe('generateDangerMap', () => {
  it('generates correct danger map for segments', () => {
    const size = getMapSize(segments);
    const emptyDangerMap = initializeDangerMap(size);
    const result = generateDangerMap(emptyDangerMap, segments);

    expect(result).toEqual(dangerMap);
  });

  it('generates correct danger map for segments when accepting 45 degree angles', () => {
    const size = getMapSize(segments);
    const emptyDangerMap = initializeDangerMap(size);
    const result = generateDangerMap(
      emptyDangerMap,
      segments,
      isHorizontalVerticalOr45Degrees
    );

    expect(result).toEqual([
      [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 0, 0, 0, 2, 0, 0],
      [0, 0, 2, 0, 1, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 2, 0, 2, 0, 0],
      [0, 1, 1, 2, 3, 1, 3, 2, 1, 1],
      [0, 0, 0, 1, 0, 2, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
    ]);
  });
});

describe('numberOfDangerousPoints', () => {
  it('returns the number of dangerous points given a danger map', () => {
    const count = numberOfDangerousPoints(dangerMap);

    expect(count).toEqual(5);
  });
});

describe('isHorizontalVerticalOr45Degrees', () => {
  it('returns true for 45 degrees', () => {
    expect(
      isHorizontalVerticalOr45Degrees({
        start: { x: 1, y: 1 },
        end: { x: 3, y: 3 },
      })
    ).toEqual(true);

    expect(
      isHorizontalVerticalOr45Degrees({
        start: { x: 9, y: 7 },
        end: { x: 7, y: 9 },
      })
    ).toEqual(true);
  });
});
