import {
  createTransparentPaper,
  countDots,
  applyFold,
  applyAllFolds,
  dotsToDisplay,
} from './day13';

const data = `
  6,10
  0,14
  9,10
  0,3
  10,4
  4,11
  6,0
  6,12
  4,1
  0,13
  10,12
  3,4
  3,0
  8,4
  1,10
  2,14
  8,10
  9,0

  fold along y=7
  fold along x=5
`;

describe('createTransparentPaper', () => {
  it('correctly parses data into paper', () => {
    const paper = createTransparentPaper(data);
    expect(paper.width).toEqual(11);
    expect(paper.height).toEqual(15);
    expect(paper.dots.length).toEqual(15);
    expect(paper.dots[0].length).toEqual(11);
    expect(countDots(paper)).toEqual(18);
    expect(paper.folds.length).toEqual(2);
  });
});

describe('applyFold', () => {
  it('correctly applies first fold for sample input', () => {
    const paper = createTransparentPaper(data);
    const updated = applyFold(paper);
    const count = countDots(updated);

    expect(count).toEqual(17);
  });
});

describe('applyAllFolds', () => {
  it('correctly applies all folds for sample input', () => {
    const paper = createTransparentPaper(data);
    const updated = applyAllFolds(paper);
    const count = countDots(updated);

    console.log(dotsToDisplay(updated));

    expect(updated.folds).toHaveLength(0);
    expect(count).toEqual(16);
  });
});
