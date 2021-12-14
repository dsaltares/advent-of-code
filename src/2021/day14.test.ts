import { runPolymerSteps, getTemplateCommonalityAfterSteps } from './day14';

const state = {
  template: 'NNCB',
  rules: {
    CH: 'B',
    HH: 'N',
    CB: 'H',
    NH: 'C',
    HB: 'C',
    HC: 'B',
    HN: 'C',
    NN: 'C',
    BH: 'H',
    NC: 'B',
    NB: 'B',
    BN: 'B',
    BB: 'N',
    BC: 'B',
    CC: 'N',
    CN: 'C',
  },
};

describe('runPolymerSteps', () => {
  it('returns correct new state after one polymer step', () => {
    const newState = runPolymerSteps(state, 1);
    expect(newState.template).toEqual('NCNBCHB');
  });

  it('returns correct new state after 2 polymer steps', () => {
    const newState = runPolymerSteps(state, 2);
    expect(newState.template).toEqual('NBCCNBBBCBHCB');
  });

  it('returns correct new state after 3 polymer steps', () => {
    const newState = runPolymerSteps(state, 3);
    expect(newState.template).toEqual('NBBBCNCCNBBNBNBBCHBHHBCHB');
  });

  it('returns correct new state after 4 polymer steps', () => {
    const newState = runPolymerSteps(state, 4);
    expect(newState.template).toEqual(
      'NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB'
    );
  });
});

describe('getTemplateCommonalityAfterSteps', () => {
  it('returns correct commonality after one polymer step', () => {
    const commonality = getTemplateCommonalityAfterSteps(state, 1);
    expect(commonality).toEqual({
      max: 2,
      min: 1,
    });
  });
  it('returns correct commonality after one polymer step', () => {
    const commonality = getTemplateCommonalityAfterSteps(state, 1);
    expect(commonality).toEqual({
      max: 2,
      min: 1,
    });
  });
  it('returns correct commonality after 10 polymer steps', () => {
    const commonality = getTemplateCommonalityAfterSteps(state, 10);
    expect(commonality).toEqual({
      max: 1749,
      min: 161,
    });
  });
});
