/* eslint-disable no-constant-condition */
import { readFileSync } from 'fs';

export type SnailNumber = Element[];
type Element = number | SnailNumber;

const readSnailNumbers = () =>
  readFileSync('./data/2021/day18.txt', 'utf-8')
    .split('\n')
    .filter((line) => !!line)
    .map((line) => JSON.parse(line) as SnailNumber);

export const magnitude = (element: Element): number =>
  typeof element === 'number'
    ? element
    : magnitude(element[0]) * 3 + magnitude(element[1]) * 2;

type ReduceResult = {
  changed: boolean;
  element: Element;
  toAddLeft?: Element;
  toAddRight?: Element;
};

const addRight = (v: Element, n: number): Element => {
  if (n === undefined) return v;
  if (typeof v === 'number') return v + n;
  return [addRight(v[0], n), v[1]];
};

const addLeft = (v: Element, n: number): Element => {
  if (n === undefined) return v;
  if (typeof v === 'number') return v + n;
  return [v[0], addLeft(v[1], n)];
};

export const explode = (element: Element, maxDepth = 4): ReduceResult => {
  if (typeof element === 'number') {
    return { changed: false, element };
  }
  const [left, right] = element;
  if (maxDepth === 0) {
    return { changed: true, toAddLeft: left, toAddRight: right, element: 0 };
  }
  let {
    changed,
    toAddLeft,
    element: newElement,
    toAddRight,
  } = explode(left, maxDepth - 1);
  if (changed) {
    return {
      changed,
      toAddLeft,
      element: [newElement, addRight(right, toAddRight as number)],
    };
  }
  ({
    changed,
    toAddLeft,
    toAddRight,
    element: newElement,
  } = explode(right, maxDepth - 1));
  if (changed) {
    return {
      changed,
      element: [addLeft(left, toAddLeft as number), newElement],
      toAddRight,
    };
  }
  return { changed: false, element };
};

type SplitResult = {
  changed: boolean;
  element: Element;
};

export const split = (element: Element): SplitResult => {
  if (typeof element === 'number' && element >= 10) {
    return {
      changed: true,
      element: [Math.floor(element / 2), Math.ceil(element / 2)],
    };
  } else if (Array.isArray(element)) {
    let { changed, element: number } = split(element[0]);
    if (changed) {
      return { changed, element: [number, element[1]] };
    } else {
      ({ changed, element: number } = split(element[1]));
      return { changed, element: [element[0], number] };
    }
  }

  return { changed: false, element };
};

export const reduce = (number: SnailNumber): SnailNumber => {
  let reduced = number;
  while (true) {
    const { changed: exploded, element: explodedNumber } = explode(reduced);
    if (exploded) {
      reduced = explodedNumber as SnailNumber;
      continue;
    }

    const { changed, element: splitNumber } = split(reduced);
    if (changed) {
      reduced = splitNumber as SnailNumber;
      continue;
    }

    break;
  }

  return reduced;
};

export const add = (first: SnailNumber, second: SnailNumber): SnailNumber =>
  reduce([first, second]);

export const addNumbers = (numbers: SnailNumber[]) =>
  numbers.slice(1).reduce((sum, acc) => add(sum, acc), numbers[0]);

const day18 = () => {
  const numbers = readSnailNumbers();
  const result = addNumbers(numbers);
  return magnitude(result);
};

export default day18;
