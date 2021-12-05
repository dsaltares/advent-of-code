import {
  getMostCommonBitAt,
  getLeastCommonBitAt,
  getGammaRate,
  getEpsilonRate,
  getOxygenGeneratorRating,
  getCO2ScrubberRating,
} from './day03';

describe('getMostCommonBitAt', () => {
  it('returns 0 when it is the most common bit', () => {
    const report = ['0', '1', '0'];
    const bit = getMostCommonBitAt(report, 0);
    expect(bit).toEqual('0');
  });

  it('returns 1 when it is the most common bit', () => {
    const report = ['0', '1', '1'];
    const bit = getMostCommonBitAt(report, 0);
    expect(bit).toEqual('1');
  });

  it('returns 1 when 0 and 1 are equally common', () => {
    const report = ['0', '1', '1', '0'];
    const bit = getMostCommonBitAt(report, 0);
    expect(bit).toEqual('1');
  });
});

describe('getLeastCommonBitAt', () => {
  it('returns 0 when it is the least common bit', () => {
    const report = ['0', '1', '1'];
    const bit = getLeastCommonBitAt(report, 0);
    expect(bit).toEqual('0');
  });

  it('returns 1 when it is the least common bit', () => {
    const report = ['0', '1', '0'];
    const bit = getLeastCommonBitAt(report, 0);
    expect(bit).toEqual('1');
  });

  it('returns 0 when 0 and 1 are equally common', () => {
    const report = ['0', '1', '1', '0'];
    const bit = getLeastCommonBitAt(report, 0);
    expect(bit).toEqual('0');
  });

  it('returns 0 when both bits are 0', () => {
    const report = ['0', '0'];
    const bit = getLeastCommonBitAt(report, 0);
    expect(bit).toEqual('0');
  });
});

describe('getGammaRate', () => {
  it('returns 0 for an empty report', () => {
    const report: string[] = [];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(0);
  });

  it('returns correct gammaRate for 1-bit numbers', () => {
    const report = ['1', '0', '1'];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(1);
  });

  it('returns correct gammaRate for 2-bit numbers', () => {
    const report = ['10', '01', '11'];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(3);
  });

  it('returns correct gammaRate for 3-bit numbers', () => {
    const report = ['101', '011', '110'];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(7);
  });
});

describe('getEpsilonRate', () => {
  it('returns 0 for an empty report', () => {
    const report: string[] = [];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(0);
  });

  it('returns correct epsilonRate for 1-bit numbers', () => {
    const report = ['1', '0', '1'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(0);
  });

  it('returns correct epsilonRate for 2-bit numbers', () => {
    const report = ['10', '01', '01'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(2);
  });

  it('returns correct epsilonRate for 3-bit numbers', () => {
    const report = ['100', '011', '010'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(5);
  });
});

describe('getOxygenGeneratorRating', () => {
  it('returns 0 for an empty report', () => {
    const report: string[] = [];
    const oxygenGeneratorRating = getOxygenGeneratorRating(report);
    expect(oxygenGeneratorRating).toEqual(0);
  });

  it('returns correct oxygenGeneratorRating for 1-bit numbers', () => {
    const report = ['1', '0', '1'];
    const oxygenGeneratorRating = getOxygenGeneratorRating(report);
    expect(oxygenGeneratorRating).toEqual(1);
  });

  it('returns correct oxygenGeneratorRating for 2-bit numbers', () => {
    const report = ['10', '01', '11'];
    const oxygenGeneratorRating = getOxygenGeneratorRating(report);
    expect(oxygenGeneratorRating).toEqual(3);
  });

  it('returns correct oxygenGeneratorRating for site example', () => {
    const report = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010',
    ];
    const oxygenGeneratorRating = getOxygenGeneratorRating(report);
    expect(oxygenGeneratorRating).toEqual(23);
  });
});

describe('getCO2ScrubberRating', () => {
  it('returns 0 for an empty report', () => {
    const report: string[] = [];
    const co2ScrubberRating = getCO2ScrubberRating(report);
    expect(co2ScrubberRating).toEqual(0);
  });

  it('returns correct co2ScrubberRating for 1-bit numbers', () => {
    const report = ['1', '0', '1'];
    const co2ScrubberRating = getCO2ScrubberRating(report);
    expect(co2ScrubberRating).toEqual(0);
  });

  it('returns correct co2ScrubberRating for 2-bit numbers', () => {
    const report = ['10', '01', '11'];
    const co2ScrubberRating = getCO2ScrubberRating(report);
    expect(co2ScrubberRating).toEqual(1);
  });

  it('returns correct co2ScrubberRating for site example', () => {
    const report = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010',
    ];
    const co2ScrubberRating = getCO2ScrubberRating(report);
    expect(co2ScrubberRating).toEqual(10);
  });
});
