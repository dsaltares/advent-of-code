import { Year } from '../types';
import { day01PartOne, day01PartTwo } from './day01';
import { day02PartOne, day02PartTwo } from './day02';
import { day03PartOne, day03PartTwo } from './day03';
import { day04PartOne, day04PartTwo } from './day04';

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
  {
    partOne: day04PartOne,
    partTwo: day04PartTwo,
  },
];

export default year;
