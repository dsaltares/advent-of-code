import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import day01 from './day01';

const days = [day01];

const main = () => {
  const argv = yargs(hideBin(process.argv)).argv;

  const dayIdx = argv._.length === 1 ? (argv._[0] as number) : undefined;

  if (dayIdx) {
    console.log(days[dayIdx - 1]());
    return;
  }

  days.forEach((day, index) => {
    console.log('day:', index + 1);
    console.log(day());
    console.log('----');
  });
};

main();
