import { createCaves, getAllPaths } from './day12';

describe('getAllPaths', () => {
  it('returns all paths for sample input', () => {
    const data = `
      start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end
    `;
    const caveMap = createCaves(data);
    const paths = getAllPaths(caveMap);

    expect(paths).toHaveLength(10);
  });

  it('returns all paths for larger sample input', () => {
    const data = `
      dc-end
      HN-start
      start-kj
      dc-start
      dc-HN
      LN-dc
      HN-end
      kj-sa
      kj-HN
      kj-dc
    `;
    const caveMap = createCaves(data);
    const paths = getAllPaths(caveMap);

    expect(paths).toHaveLength(19);
  });

  it('returns all paths for sample input when allowing 1 visit to small caves', () => {
    const data = `
      start-A
      start-b
      A-c
      A-b
      b-d
      A-end
      b-end
    `;
    const caveMap = createCaves(data);
    const allowTwoVisitsToOneSmallCave = true;
    const paths = getAllPaths(caveMap, allowTwoVisitsToOneSmallCave);
    expect(paths).toHaveLength(36);
  });
});
