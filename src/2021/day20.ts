import { readFileSync } from 'fs';

type Image = number[][];
type Enhancement = number[];
type Input = {
  enhancement: Enhancement;
  image: Image;
};

const toBit = (pixel: string) => (pixel === '#' ? 1 : 0);
const toPixel = (bit: number) => (bit ? '#' : '.');

export const toPixels = (image: Image) =>
  image.map((line) => line.map(toPixel).join('')).join('\n');

export const getWindowValue = (
  x: number,
  y: number,
  image: Image,
  bg: number
) => {
  const width = image[0].length;
  const height = image.length;
  const binary = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
    .map(([x, y]) =>
      x >= 0 && x < width && y >= 0 && y < height ? image[y][x] : bg
    )
    .join('');
  return parseInt(binary, 2);
};

export const enhance = (
  image: Image,
  enhancement: Enhancement,
  steps = 1
): Image => {
  let enhanced = image;
  let background = 0;
  const flipEachTurn =
    enhancement[0] === 1 && enhancement[enhancement.length - 1] === 0;

  for (let step = 0; step < steps; ++step) {
    const width = enhanced[0].length;
    enhanced = [
      Array(width + 2).fill(background),
      ...enhanced.map((row) => [background, ...row, background]),
      Array(width + 2).fill(background),
    ];

    enhanced = enhanced.map((row, y) =>
      row.map((_, x) => enhancement[getWindowValue(x, y, enhanced, background)])
    );

    if (flipEachTurn) {
      background = background === 1 ? 0 : 1;
    }
  }
  return enhanced;
};

export const countLitPixels = (image: Image) => {
  const width = image[0].length;
  const height = image.length;
  let count = 0;
  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      if (image[y][x] === 1) {
        count++;
      }
    }
  }
  return count;
};

export const createInput = (data: string): Input => {
  const lines = data
    .split('\n')
    .map((line) => line.trimStart().trimEnd())
    .filter((line) => !!line);
  return {
    enhancement: lines[0].split('').map(toBit),
    image: lines.slice(1).map((line) => line.split('').map(toBit)),
  };
};

const readInput = (): Input =>
  createInput(readFileSync('./data/2021/day20.txt', 'utf-8'));

const day20 = () => {
  const { image, enhancement } = readInput();
  const enhanced = enhance(image, enhancement, 2);
  return countLitPixels(enhanced);
};

export const day20PartTwo = () => {
  const { image, enhancement } = readInput();
  const enhanced = enhance(image, enhancement, 50);
  return countLitPixels(enhanced);
};

export default day20;
