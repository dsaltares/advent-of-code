import { getGammaRate, getEpsilonRate } from './day03';

describe('getGammaRate', () => {
  it('returns 0 for an empty report', () => {
    const report: string[] = [];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(0);
  });

  it('returns correct gammaRate for 1-digit binary numbers', () => {
    const report = ['1', '0', '1'];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(1);
  });

  it('returns correct gammaRate for 2-digit binary numbers', () => {
    const report = ['10', '01', '11'];
    const gammaRate = getGammaRate(report);
    expect(gammaRate).toEqual(3);
  });

  it('returns correct gammaRate for 3-digit binary numbers', () => {
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

  it('returns correct epsilonRate for 1-digit binary numbers', () => {
    const report = ['1', '0', '1'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(0);
  });

  it('returns correct epsilonRate for 2-digit binary numbers', () => {
    const report = ['10', '01', '01'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(2);
  });

  it('returns correct epsilonRate for 3-digit binary numbers', () => {
    const report = ['100', '011', '010'];
    const epsilonRate = getEpsilonRate(report);
    expect(epsilonRate).toEqual(5);
  });
});
