import { createInstructions, applyInstructions, countOnCubes } from './day22';

describe('createInstructions', () => {
  it('creates correct set of instructions from sample input', () => {
    const data = `
      on x=-13..38,y=-13..32,z=2..48
      off x=33..42,y=4..13,z=-30..-19
    `;
    const instructions = createInstructions(data);

    expect(instructions).toEqual([
      {
        state: true,
        start: { x: -13, y: -13, z: 2 },
        end: { x: 38, y: 32, z: 48 },
      },
      {
        state: false,
        start: { x: 33, y: 4, z: -30 },
        end: { x: 42, y: 13, z: -19 },
      },
    ]);
  });
});

describe('applyInstructions', () => {
  it('applies instructions on sample input and gets correct number of on cubes', () => {
    const data = `
      on x=10..12,y=10..12,z=10..12
      on x=11..13,y=11..13,z=11..13
      off x=9..11,y=9..11,z=9..11
      on x=10..10,y=10..10,z=10..10
    `;
    const instructions = createInstructions(data);
    const state = applyInstructions(instructions);
    const count = countOnCubes(state);

    expect(count).toEqual(39);
  });
});
