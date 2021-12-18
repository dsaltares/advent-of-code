import {
  createArea,
  stepProbe,
  highestYPositionInValidTrajectory,
} from './day17';

describe('createArea', () => {
  it('correctly parses area from string', () => {
    const data = 'target area: x=20..30, y=-10..-5';
    const area = createArea(data);

    expect(area).toEqual({
      position: { x: 20, y: -10 },
      size: { x: 10, y: 5 },
    });
  });
});

describe('stepProbe', () => {
  it('correctly steps probe given initial velocity and position', () => {
    let position = { x: 0, y: 0 };
    let velocity = { x: 7, y: 2 };

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 7, y: 2 });
    expect(velocity).toEqual({ x: 6, y: 1 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 13, y: 3 });
    expect(velocity).toEqual({ x: 5, y: 0 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 18, y: 3 });
    expect(velocity).toEqual({ x: 4, y: -1 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 22, y: 2 });
    expect(velocity).toEqual({ x: 3, y: -2 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 25, y: 0 });
    expect(velocity).toEqual({ x: 2, y: -3 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 27, y: -3 });
    expect(velocity).toEqual({ x: 1, y: -4 });

    ({ position, velocity } = stepProbe(position, velocity));
    expect(position).toEqual({ x: 28, y: -7 });
    expect(velocity).toEqual({ x: 0, y: -5 });
  });
});

describe('highestYPositionInValidTrajectory', () => {
  it('returns highest Y point for sample target area', () => {
    const area = {
      position: { x: 20, y: -10 },
      size: { x: 10, y: 5 },
    };
    const highestY = highestYPositionInValidTrajectory(area);

    expect(highestY).toEqual(45);
  });
});
