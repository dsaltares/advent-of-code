import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import day01, { day01PartTwo } from './day01';
import day02, { day02PartTwo } from './day02';
import day03, { day03PartTwo } from './day03';
import day04, { day04PartTwo } from './day04';
import day05, { day05PartTwo } from './day05';
import day06 from './day06';

type Day = {
  main: () => void;
  partTwo?: () => void;
};

const days: Day[] = [
  {
    main: day01,
    partTwo: day01PartTwo,
  },
  {
    main: day02,
    partTwo: day02PartTwo,
  },
  {
    main: day03,
    partTwo: day03PartTwo,
  },
  {
    main: day04,
    partTwo: day04PartTwo,
  },
  {
    main: day05,
    partTwo: day05PartTwo,
  },
  {
    main: day06,
  },
];

const runDay = (index: number) => {
  const day = days[index];

  console.log('day:', index + 1);
  console.log(day.main());
  console.log('----');

  if (day.partTwo) {
    console.log('day:', index + 1, 'part 2');
    console.log(day.partTwo());
    console.log('----');
  }
};

const main = () => {
  const argv = yargs(hideBin(process.argv)).argv;

  const dayIdx = argv._.length === 1 ? (argv._[0] as number) - 1 : undefined;

  if (dayIdx) {
    runDay(dayIdx);
    return;
  }

  days.forEach((_day, index) => {
    runDay(index);
  });
};

main();
