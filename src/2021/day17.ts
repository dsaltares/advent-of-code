import { readFileSync } from 'fs';

export type Vec2 = {
  x: number;
  y: number;
};

export type Area = {
  position: Vec2;
  size: Vec2;
};

export const createArea = (data: string): Area => {
  const match = data.match(
    /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/
  ) as RegExpMatchArray;
  const [xStart, xEnd, yStart, yEnd] = match
    .slice(1)
    .map((value) => parseInt(value, 10));
  return {
    position: { x: xStart, y: yStart },
    size: { x: Math.abs(xEnd - xStart), y: Math.abs(yEnd - yStart) },
  };
};

const readArea = () =>
  createArea(readFileSync('./data/2021/day17.txt', 'utf-8'));

export const stepProbe = (position: Vec2, velocity: Vec2) => ({
  position: {
    x: position.x + velocity.x,
    y: position.y + velocity.y,
  },
  velocity: {
    x: Math.max(velocity.x + Math.sign(velocity.x) * -1, 0),
    y: velocity.y - 1,
  },
});

export const inTargetArea = (position: Vec2, area: Area) =>
  position.x >= area.position.x &&
  position.x <= area.position.x + area.size.x &&
  position.y >= area.position.y &&
  position.y <= area.position.y + area.size.y;

export const hasOvershot = (position: Vec2, area: Area) =>
  position.x > area.position.x + area.size.x || position.y < area.position.y;

export const getValidVelocities = (area: Area) => {
  const validVelocities = [];
  for (let velX = 0; velX < area.position.x + area.size.x + 1; ++velX) {
    for (let velY = -1000; velY < 1000; ++velY) {
      let maxY = 0;
      let isValidTrajectory = false;
      let position = { x: 0, y: 0 };
      let velocity = { x: velX, y: velY };

      while (!hasOvershot(position, area)) {
        ({ position, velocity } = stepProbe(position, velocity));
        isValidTrajectory = isValidTrajectory || inTargetArea(position, area);
        maxY = Math.max(maxY, position.y);
      }

      if (isValidTrajectory) {
        validVelocities.push({
          velocity: { x: velX, y: velY },
          maxY,
        });
      }
    }
  }

  return validVelocities;
};

export const highestYPositionInValidTrajectory = (area: Area) =>
  Math.max(...getValidVelocities(area).map((valid) => valid.maxY));

export const numberOfValidInitialVelocities = (area: Area) =>
  getValidVelocities(area).length;

const day17 = () => {
  const area = readArea();
  return highestYPositionInValidTrajectory(area);
};

export const day17PartTwo = () => {
  const area = readArea();
  return numberOfValidInitialVelocities(area);
};

export default day17;
