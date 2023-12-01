import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import year2015 from './2015';
import year2021 from './2021';
import year2022 from './2022';
import year2023 from './2023';
import { Solutions } from './types';

const solutions: Solutions = {
  2015: year2015,
  2021: year2021,
  2022: year2022,
  2023: year2023,
};

const main = async () => {
  const argv = await yargs(hideBin(process.argv))
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
        if (day.partOne) {
          console.log('  - part 1:', day.partOne());
        }
        if (day.partTwo) {
          console.log('  - part 2:', day.partTwo());
        }
      });
    });
};

main();
