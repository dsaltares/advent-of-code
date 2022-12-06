import type { Year } from '../types';
import { day01PartOne, day01PartTwo } from './day01';
import { day02PartOne, day02PartTwo } from './day02';
import { day03PartOne, day03PartTwo } from './day03';

const year: Year = [
  {
    partOne: day01PartOne,
    partTwo: day01PartTwo,
  },
  {
    partOne: day02PartOne,
    partTwo: day02PartTwo,
  },
  {
    partOne: day03PartOne,
    partTwo: day03PartTwo,
  },
];

export default year;
