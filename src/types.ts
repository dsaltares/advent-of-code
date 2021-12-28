export type Day = {
  partOne?: () => unknown;
  partTwo?: () => unknown;
};

export type Year = Day[];

export type Solutions = Record<string, Year>;
