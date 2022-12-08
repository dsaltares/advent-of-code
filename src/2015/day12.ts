import { readFileSync } from 'fs';

export const day12PartOne = () => sumAllNumbers(readDocument());

export const day12PartTwo = () =>
  sumAllNumbersExceptObjectsWithRed(readDocument());

const readDocument = () =>
  parseDocument(readFileSync('./data/2015/day12.txt', 'utf-8'));

export const parseDocument = (input: string) => JSON.parse(input);

export const sumAllNumbers = (node: unknown) => sumDocument(node, () => true);

export const sumAllNumbersExceptObjectsWithRed = (node: unknown): number =>
  sumDocument(node, doesNotContainRed);

const sumDocument = (
  document: unknown,
  filterObjFn: (object: object) => boolean
) => {
  const nodes = [document];
  let sum = 0;
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (typeof node === 'number') {
      sum += node;
    } else if (Array.isArray(node)) {
      nodes.push(...node);
    } else if (typeof node === 'object' && node) {
      if (filterObjFn(node)) {
        nodes.push(...Object.values(node));
      }
    }
  }
  return sum;
};

const doesNotContainRed = (object: object) =>
  !Object.values(object).includes('red');
