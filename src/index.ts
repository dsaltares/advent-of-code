import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import day01, { day01PartTwo } from './2021/day01';
import day02, { day02PartTwo } from './2021/day02';
import day03, { day03PartTwo } from './2021/day03';
import day04, { day04PartTwo } from './2021/day04';
import day05, { day05PartTwo } from './2021/day05';
import day06, { day06PartTwo } from './2021/day06';
import day07, { day07PartTwo } from './2021/day07';
import day08, { day08PartTwo } from './2021/day08';
import day09, { day09PartTwo } from './2021/day09';
import day10, { day10PartTwo } from './2021/day10';
import day11, { day11PartTwo } from './2021/day11';
import day12, { day12PartTwo } from './2021/day12';
import day13, { day13PartTwo } from './2021/day13';
import day14, { day14PartTwo } from './2021/day14';
import day15, { day15PartTwo } from './2021/day15';
import day16, { day16PartTwo } from './2021/day16';
import day17, { day17PartTwo } from './2021/day17';
import day18, { day18PartTwo } from './2021/day18';
import day19, { day19PartTwo } from './2021/day19';

type Day = {
  partOne: () => unknown;
  partTwo?: () => unknown;
};

type Solutions = Record<string, Day[]>;

const solutions: Solutions = {
  2021: [
    {
      partOne: day01,
      partTwo: day01PartTwo,
    },
    {
      partOne: day02,
      partTwo: day02PartTwo,
    },
    {
      partOne: day03,
      partTwo: day03PartTwo,
    },
    {
      partOne: day04,
      partTwo: day04PartTwo,
    },
    {
      partOne: day05,
      partTwo: day05PartTwo,
    },
    {
      partOne: day06,
      partTwo: day06PartTwo,
    },
    {
      partOne: day07,
      partTwo: day07PartTwo,
    },
    {
      partOne: day08,
      partTwo: day08PartTwo,
    },
    {
      partOne: day09,
      partTwo: day09PartTwo,
    },
    {
      partOne: day10,
      partTwo: day10PartTwo,
    },
    {
      partOne: day11,
      partTwo: day11PartTwo,
    },
    {
      partOne: day12,
      partTwo: day12PartTwo,
    },
    {
      partOne: day13,
      partTwo: day13PartTwo,
    },
    {
      partOne: day14,
      partTwo: day14PartTwo,
    },
    {
      partOne: day15,
      partTwo: day15PartTwo,
    },
    {
      partOne: day16,
      partTwo: day16PartTwo,
    },
    {
      partOne: day17,
      partTwo: day17PartTwo,
    },
    {
      partOne: day18,
      partTwo: day18PartTwo,
    },
    {
      partOne: day19,
      partTwo: day19PartTwo,
    },
  ],
};

const main = () => {
  const argv = yargs(hideBin(process.argv))
    .scriptName('advent-of-code')
    .usage('Usage: $0 -y num -d num')
    .example(
      '$0 -y 2021 -d 5',
      'Runs the Advent of Code solution for the 5th day of the 2021 challenge'
    )
    .option('y', {
      alias: 'year',
      describe: 'The year',
      type: 'number',
    })
    .option('d', {
      alias: 'day',
      describe: 'The day',
      type: 'number',
    })
    .help()
    .strict().argv;

  Object.keys(solutions)
    .sort()
    .forEach((year) => {
      if (argv.y !== undefined && argv.y !== parseInt(year, 10)) {
        return;
      }

      console.log('');
      console.log('🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅');
      console.log(`🎄 Advent of Code - Year ${year} 🎄`);
      console.log('🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅🎅');

      const days = solutions[year];
      days.forEach((day, dayIndex) => {
        if (argv.d !== undefined && argv.d !== dayIndex + 1) {
          return;
        }

        console.log('🌟 day:', dayIndex + 1);
        console.log('  - part 1:', day.partOne());
        if (day.partTwo) {
          console.log('  - part 2:', day.partTwo());
        }
      });
    });
};

main();
