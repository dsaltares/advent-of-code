import { multiplyLowAndHighPulsesSent, parseModules } from './day20';

describe('day20PartOne', () => {
  test.each([
    {
      input: `
      broadcaster -> a, b, c
      %a -> b
      %b -> c
      %c -> inv
      &inv -> a
      `,
      expected: 32000000,
    },
    {
      input: `
      broadcaster -> a
      %a -> inv, con
      &inv -> b
      %b -> con
      &con -> output
      `,
      expected: 11687500,
    },
  ])(
    'returns the product of the number of high and low pulses after pressing the button 1000 times - $input',
    ({ input, expected }) => {
      const modules = parseModules(input);
      const product = multiplyLowAndHighPulsesSent(modules);
      expect(product).toEqual(expected);
    }
  );
});
