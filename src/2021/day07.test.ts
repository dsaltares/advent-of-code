import {
  getMinimumFuelCostForCrabAlignment,
  linearFuelConsumption,
  crabFuelConsumption,
} from './day07';

describe('getMinimumFuelCostForCrabAlignment', () => {
  it('returns correct minimum fuel cost for crab alignment with linear fuel consumption', () => {
    const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const cost = getMinimumFuelCostForCrabAlignment(
      positions,
      linearFuelConsumption
    );

    expect(cost).toEqual(37);
  });

  it('returns correct minimum fuel cost for crab alignment with real crab fuel consumption', () => {
    const positions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const cost = getMinimumFuelCostForCrabAlignment(
      positions,
      crabFuelConsumption
    );

    expect(cost).toEqual(168);
  });
});
