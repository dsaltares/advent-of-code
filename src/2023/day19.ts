import { readFileSync } from 'fs';

export const day19PartOne = () => {
  const { parts, workflows } = readInput();
  return sumAcceptedPartsRatings(parts, workflows);
};

export const day19PartTwo = () => {
  const { workflows } = readInput();
  return getAcceptedRatingCombinations(workflows);
};

const readInput = () =>
  parseInput(readFileSync('./data/2023/day19.txt', 'utf-8'));

export const parseInput = (input: string): Input => {
  const [workflows, parts] = input.split('\n\n').map((lines) =>
    lines
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => !!line)
  );
  return {
    workflows: workflows
      .map((line) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, name, rules] = line.match(/([a-zA-Z]+){(.*)}/)!;
        return {
          name,
          rules: rules.split(',').map((rule) => {
            if (rule.includes(':')) {
              const [condition, workflow] = rule.split(':');
              const [category, operator, value] = condition.split(/([><])/);
              return {
                condition: {
                  category: category as Category,
                  operator: operator as Operator,
                  value: parseInt(value, 10),
                },
                workflow,
              };
            }
            return {
              workflow: rule,
            };
          }),
        };
      })
      .reduce(
        (acc, workflow) => acc.set(workflow.name, workflow),
        new Map<string, Workflow>()
      ),
    parts: parts.map((line) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, x, m, a, s] = line.match(
        /{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/
      )!;
      return {
        x: parseInt(x, 10),
        m: parseInt(m, 10),
        a: parseInt(a, 10),
        s: parseInt(s, 10),
        workflow: 'in',
      };
    }),
  };
};

export const sumAcceptedPartsRatings = (
  parts: Part[],
  workflows: Workflows
) => {
  runWorkflowsOnParts(parts, workflows);
  return parts
    .filter((part) => part.workflow === 'A')
    .reduce((sum, part) => sum + part.a + part.m + part.s + part.x, 0);
};

const MinRating = 1;
const MaxRating = 4000;
type Node = {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
  workflow: string;
  step: number;
};
type Range = {
  start: number;
  end: number;
};
export const getAcceptedRatingCombinations = (workflows: Workflows) => {
  const accepted: Node[] = [];
  const start: Node = {
    x: { start: MinRating, end: MaxRating },
    m: { start: MinRating, end: MaxRating },
    a: { start: MinRating, end: MaxRating },
    s: { start: MinRating, end: MaxRating },
    workflow: 'in',
    step: 0,
  };
  const queue: Node[] = [start];
  while (queue.length > 0) {
    const node = queue.pop()!;
    if (node.workflow === 'A') {
      accepted.push(node);
      continue;
    }

    if (node.workflow === 'R') {
      continue;
    }

    const workflow = workflows.get(node.workflow)!;
    if (!workflow) {
      continue;
    }

    const rule = workflow.rules[node.step];
    if (!rule) {
      continue;
    }

    if (rule.condition) {
      const nodeRange = node[rule.condition.category];
      const passRange =
        rule.condition.operator === '>'
          ? { start: rule.condition.value + 1, end: MaxRating }
          : { start: MinRating, end: rule.condition.value - 1 };
      const passStart = Math.max(nodeRange.start, passRange.start);
      const passEnd = Math.min(nodeRange.end, passRange.end);
      if (passStart <= passEnd) {
        queue.push({
          ...node,
          [rule.condition.category]: {
            start: passStart,
            end: passEnd,
          },
          workflow: rule.workflow,
          step: 0,
        });
      }

      const failRange =
        rule.condition.operator === '>'
          ? { start: MinRating, end: rule.condition.value }
          : { start: rule.condition.value, end: MaxRating };
      const failStart = Math.max(nodeRange.start, failRange.start);
      const failEnd = Math.min(nodeRange.end, failRange.end);
      if (failStart <= failEnd) {
        queue.push({
          ...node,
          [rule.condition.category]: {
            start: failStart,
            end: failEnd,
          },
          step: node.step + 1,
        });
      }
      continue;
    }

    queue.push({
      ...node,
      workflow: rule.workflow,
      step: 0,
    });
  }
  return accepted.reduce((acc, node) => {
    const x = node.x.end - node.x.start + 1;
    const m = node.m.end - node.m.start + 1;
    const s = node.s.end - node.s.start + 1;
    const a = node.a.end - node.a.start + 1;
    return acc + x * m * s * a;
  }, 0);
};

const runWorkflowsOnParts = (parts: Part[], workflows: Workflows) =>
  parts.forEach((part) => runWorkflowsOnPart(part, workflows));

const runWorkflowsOnPart = (part: Part, workflows: Workflows) => {
  while (!isDone(part, workflows)) {
    runWorkflow(part, workflows.get(part.workflow)!);
  }
};

const runWorkflow = (part: Part, workflow: Workflow) => {
  for (let ruleIdx = 0; ruleIdx < workflow.rules.length; ruleIdx++) {
    const rule = workflow.rules[ruleIdx];
    if (rule.condition) {
      const rating = part[rule.condition.category];
      const meetsCondition =
        rule.condition.operator === '>'
          ? rating > rule.condition.value
          : rating < rule.condition.value;
      if (meetsCondition) {
        part.workflow = rule.workflow;
        return;
      }
    } else {
      part.workflow = rule.workflow;
      return;
    }
  }
};

const isDone = (part: Part, workflows: Workflows) =>
  part.workflow === 'A' ||
  part.workflow === 'R' ||
  !workflows.has(part.workflow);

type Input = {
  parts: Part[];
  workflows: Workflows;
};
type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
  workflow: string;
};
type Workflows = Map<string, Workflow>;
type Workflow = {
  name: string;
  rules: Rule[];
};
type Rule = {
  condition?: Condition;
  workflow: string;
};
type Condition = {
  category: Category;
  operator: Operator;
  value: number;
};
type Operator = '>' | '<';
type Category = 'x' | 'm' | 'a' | 's';
