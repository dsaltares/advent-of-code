import { readFileSync } from 'fs';

type ConditionReportEntry = {
  conditions: string;
  groups: number[];
};
type ConditionReport = ConditionReportEntry[];

export const day12PartOne = () => {
  const report = readConditionReport();
  return sumPossibleArrangements(report);
};

export const day12PartTwo = () => {
  const report = readConditionReport();
  const unfolded = unfold(report);
  return sumPossibleArrangements(unfolded);
};

const readConditionReport = () =>
  parseConditionReport(readFileSync('./data/2023/day12.txt', 'utf-8'));

export const parseConditionReport = (input: string): ConditionReport =>
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const [conditions, groups] = line.split(' ');
      return {
        conditions,
        groups: groups.split(',').map((group) => parseInt(group, 10)),
      };
    });

export const sumPossibleArrangements = (report: ConditionReport) => {
  const cache = new Map<string, number>();
  return report.reduce(
    (acc, entry) => acc + getPossibleArrangements(entry, cache),
    0
  );
};

export const getPossibleArrangements = (
  { conditions, groups }: ConditionReportEntry,
  cache: Map<string, number>
) => {
  if (conditions.length === 0) {
    return groups.length > 0 ? 0 : 1;
  }

  if (groups.length === 0) {
    return conditions.includes('#') ? 0 : 1;
  }

  const cacheKey = getKey(conditions, groups);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  let arrangements = 0;
  const condition = conditions[0];
  const noBrokenSpringPossible = condition === '.' || condition === '?';
  if (noBrokenSpringPossible) {
    arrangements += getPossibleArrangements(
      {
        conditions: conditions.slice(1),
        groups,
      },
      cache
    );
  }

  const group = groups[0];
  const brokenSpringPossible = condition === '#' || condition === '?';
  if (brokenSpringPossible) {
    const canFitGroup = group <= conditions.length;
    const blockNotFollowedByBrokenSpring =
      group === conditions.length || conditions[group] !== '#';
    const groupBlockDoesNotIncludeGoodSpring = !conditions
      .slice(0, group)
      .includes('.');
    if (
      canFitGroup &&
      blockNotFollowedByBrokenSpring &&
      groupBlockDoesNotIncludeGoodSpring
    ) {
      arrangements += getPossibleArrangements(
        {
          conditions: conditions.slice(group + 1),
          groups: groups.slice(1),
        },
        cache
      );
    }
  }

  cache.set(cacheKey, arrangements);

  return arrangements;
};

const UnfoldFactor = 5;

export const unfold = (report: ConditionReport) =>
  report.map(({ conditions, groups }) => ({
    conditions: Array.from(Array(UnfoldFactor)).fill(conditions).join('?'),
    groups: Array.from(Array(UnfoldFactor)).fill(groups).flat(),
  }));

const getKey = (conditions: string, groups: number[]) =>
  JSON.stringify({ conditions, groups });
