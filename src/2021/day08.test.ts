import {
  Entry,
  createMalfunctioningEntries,
  countDigitsWithUniqueNumberOfSegments,
} from './day08';

const input = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
`;

const sampleEntries: Entry[] = [
  {
    signalPatterns: [
      'be',
      'cfbegad',
      'cbdgef',
      'fgaecd',
      'cgeb',
      'fdcge',
      'agebfd',
      'fecdb',
      'fabcd',
      'edb',
    ],
    output: ['fdgacbe', 'cefdb', 'cefbgd', 'gcbe'],
  },
  {
    signalPatterns: [
      'edbfga',
      'begcd',
      'cbg',
      'gc',
      'gcadebf',
      'fbgde',
      'acbgfd',
      'abcde',
      'gfcbed',
      'gfec',
    ],
    output: ['fcgedb', 'cgb', 'dgebacf', 'gc'],
  },
  {
    signalPatterns: [
      'fgaebd',
      'cg',
      'bdaec',
      'gdafb',
      'agbcfd',
      'gdcbef',
      'bgcad',
      'gfac',
      'gcb',
      'cdgabef',
    ],
    output: ['cg', 'cg', 'fdcagb', 'cbg'],
  },
  {
    signalPatterns: [
      'fbegcd',
      'cbd',
      'adcefb',
      'dageb',
      'afcb',
      'bc',
      'aefdc',
      'ecdab',
      'fgdeca',
      'fcdbega',
    ],
    output: ['efabcd', 'cedba', 'gadfec', 'cb'],
  },
  {
    signalPatterns: [
      'aecbfdg',
      'fbg',
      'gf',
      'bafeg',
      'dbefa',
      'fcge',
      'gcbea',
      'fcaegb',
      'dgceab',
      'fcbdga',
    ],
    output: ['gecf', 'egdcabf', 'bgf', 'bfgea'],
  },
  {
    signalPatterns: [
      'fgeab',
      'ca',
      'afcebg',
      'bdacfeg',
      'cfaedg',
      'gcfdb',
      'baec',
      'bfadeg',
      'bafgc',
      'acf',
    ],
    output: ['gebdcfa', 'ecba', 'ca', 'fadegcb'],
  },
  {
    signalPatterns: [
      'dbcfg',
      'fgd',
      'bdegcaf',
      'fgec',
      'aegbdf',
      'ecdfab',
      'fbedc',
      'dacgb',
      'gdcebf',
      'gf',
    ],
    output: ['cefg', 'dcbef', 'fcge', 'gbcadfe'],
  },
  {
    signalPatterns: [
      'bdfegc',
      'cbegaf',
      'gecbf',
      'dfcage',
      'bdacg',
      'ed',
      'bedf',
      'ced',
      'adcbefg',
      'gebcd',
    ],
    output: ['ed', 'bcgafe', 'cdgba', 'cbgef'],
  },
  {
    signalPatterns: [
      'egadfb',
      'cdbfeg',
      'cegd',
      'fecab',
      'cgb',
      'gbdefca',
      'cg',
      'fgcdab',
      'egfdb',
      'bfceg',
    ],
    output: ['gbdfcae', 'bgc', 'cg', 'cgb'],
  },
  {
    signalPatterns: [
      'gcafb',
      'gcf',
      'dcaebfg',
      'ecagb',
      'gf',
      'abcdeg',
      'gaef',
      'cafbge',
      'fdbac',
      'fegbdc',
    ],
    output: ['fgae', 'cfgab', 'fg', 'bagce'],
  },
];

describe('createMalfunctioningEntries', () => {
  it('correctly creates entries from input', () => {
    const entries = createMalfunctioningEntries(input);
    expect(entries).toEqual(sampleEntries);
  });
});

describe('countDigitsWithUniqueNumberOfSegments', () => {
  it('returns correct count of digits with unique number of segments for sample input', () => {
    const count = countDigitsWithUniqueNumberOfSegments(sampleEntries);
    expect(count).toEqual(26);
  });
});
