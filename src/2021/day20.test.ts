import { createInput, getWindowValue, enhance, countLitPixels } from './day20';

const data = `
  ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

  #..#.
  #....
  ##..#
  ..#..
  ..###
`;

describe('createInput', () => {
  it('creates input from raw sample data', () => {
    const { image, enhancement } = createInput(data);
    expect(image).toEqual([
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ]);
    expect(enhancement).toHaveLength(512);
  });
});

describe('getWindowValue', () => {
  it('returns correct window value for middle pixel', () => {
    const { image } = createInput(data);
    expect(image).toEqual([
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ]);
    const windowValue = getWindowValue(2, 2, image, 0);

    expect(windowValue).toEqual(34);
  });

  it('returns correct window value for edge pixel', () => {
    const { image } = createInput(data);
    expect(image).toEqual([
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ]);
    const windowValue = getWindowValue(0, 0, image, 0);

    expect(windowValue).toEqual(18);
  });

  it('returns correct window value for edge pixel with background 1', () => {
    const { image } = createInput(data);
    expect(image).toEqual([
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ]);
    const windowValue = getWindowValue(0, 0, image, 1);

    expect(windowValue).toEqual(502);
  });
});

describe('enhance', () => {
  it('enhances sample image once', () => {
    const { image, enhancement } = createInput(data);
    const enhanced = enhance(image, enhancement);

    expect(enhanced).toEqual([
      [0, 1, 1, 0, 1, 1, 0],
      [1, 0, 0, 1, 0, 1, 0],
      [1, 1, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 1],
      [0, 1, 0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 1, 0, 1, 0],
    ]);
  });

  it('enhances sample image twice', () => {
    const { image, enhancement } = createInput(data);
    const steps = 2;
    const enhanced = enhance(image, enhancement, steps);

    expect(enhanced).toEqual([
      [0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0],
    ]);
  });
});

describe('countLitPixels', () => {
  it('returns correct count of lit pixels after enhancing sample image twice', () => {
    const { image, enhancement } = createInput(data);
    const steps = 2;
    const enhanced = enhance(image, enhancement, steps);
    const count = countLitPixels(enhanced);

    expect(count).toEqual(35);
  });
});
