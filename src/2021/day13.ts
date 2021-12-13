import { readFileSync } from 'fs';
import cloneDeep from 'lodash.clonedeep';

type Fold = {
  axis: 'x' | 'y';
  value: number;
};

export type Paper = {
  dots: boolean[][];
  width: number;
  height: number;
  folds: Fold[];
};

const dotRegExp = /\d+,\d+/;

export const createTransparentPaper = (data: string): Paper => {
  const paper: Paper = {
    dots: [],
    width: 0,
    height: 0,
    folds: [],
  };

  const lines = data
    .split('\n')
    .filter((line) => !!line)
    .map((line) => line.trimStart().trimEnd());
  const coords = lines
    .filter((line) => dotRegExp.test(line))
    .map((line) => {
      const [x, y] = line.split(',');
      return {
        x: parseInt(x, 10),
        y: parseInt(y, 10),
      };
    });
  paper.folds = lines
    .filter((line) => !dotRegExp.test(line))
    .map((line) => {
      const [first, value] = line.split('=');
      return {
        axis: first[first.length - 1] as 'x' | 'y',
        value: parseInt(value, 10),
      };
    });
  paper.width = Math.max(...coords.map((coord) => coord.x)) + 1;
  paper.height = Math.max(...coords.map((coord) => coord.y)) + 1;
  paper.dots = Array(paper.height)
    .fill([])
    .map(() => Array(paper.width).fill(false));
  coords.forEach(({ x, y }) => {
    paper.dots[y][x] = true;
  });

  return paper;
};

const readTransparentPaper = () =>
  createTransparentPaper(readFileSync('./data/2021/day13.txt', 'utf-8'));

export const countDots = (paper: Paper) => {
  let count = 0;
  for (let x = 0; x < paper.width; ++x) {
    for (let y = 0; y < paper.height; ++y) {
      if (paper.dots[y][x]) {
        count++;
      }
    }
  }
  return count;
};

export const applyFold = (paper: Paper) => {
  if (paper.folds.length === 0) {
    return paper;
  }

  const newPaper = cloneDeep(paper);
  const fold = newPaper.folds.shift() as Fold;
  if (fold.axis === 'y') {
    newPaper.dots.splice(fold.value);
    newPaper.height = Math.floor(newPaper.height / 2);
    for (let x = 0; x < newPaper.width; x++) {
      for (let y = 0; y < newPaper.height; y++) {
        newPaper.dots[y][x] =
          newPaper.dots[y][x] || paper.dots[paper.height - y - 1][x];
      }
    }
  } else {
    newPaper.dots = newPaper.dots.map((row) => row.slice(0, fold.value));
    newPaper.width = Math.floor(newPaper.width / 2);
    for (let x = 0; x < newPaper.width; x++) {
      for (let y = 0; y < newPaper.height; y++) {
        newPaper.dots[y][x] =
          newPaper.dots[y][x] || paper.dots[y][paper.width - x - 1];
      }
    }
  }

  return newPaper;
};

export const applyAllFolds = (paper: Paper) => {
  let newPaper = cloneDeep(paper);
  while (newPaper.folds.length > 0) {
    newPaper = applyFold(newPaper);
  }
  return newPaper;
};

export const dotsToDisplay = (paper: Paper) =>
  paper.dots.reduce(
    (acc: string, row) =>
      `${acc}\n${row.map((value) => (value ? '#' : '.')).join('')}`,
    ''
  );

const day13 = () => {
  const paper = readTransparentPaper();
  const updated = applyFold(paper);
  return countDots(updated);
};

export const day13PartTwo = () => {
  let paper = readTransparentPaper();
  paper = applyAllFolds(paper);
  return dotsToDisplay(paper);
};

export default day13;
