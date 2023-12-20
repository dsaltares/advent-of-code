import { readFileSync } from 'fs';

export const day20PartOne = () => {
  const modules = readModules();
  return multiplyLowAndHighPulsesSent(modules);
};

export const day20PartTwo = () => {
  const modules = readModules();
  return minNumberOfButtonPressesToActivateSandMachine(modules);
};

const readModules = () =>
  parseModules(readFileSync('./data/2023/day20.txt', 'utf-8'));

export const parseModules = (input: string): Modules => {
  const modules = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, type, name, connections] = line.match(
        /([%&]?)([a-zA-Z]+) -> (.*)/
      )!;
      const connectionsArray = connections.split(', ');
      if (name === 'broadcaster') {
        return {
          type: 'broadcaster' as const,
          name,
          connections: connectionsArray,
        };
      } else if (type === '%') {
        return {
          type: 'flip-flop' as const,
          name,
          connections: connectionsArray,
          state: false,
        };
      } else {
        return {
          type: 'conjunction' as const,
          name,
          connections: connectionsArray,
          memory: new Map(),
        };
      }
    })
    .reduce(
      (modules, module) => modules.set(module.name, module),
      new Map<string, Module>()
    );

  [
    ...new Set(
      [...modules.values()].flatMap((module) => module.connections)
    ).values(),
  ].forEach((connection) => {
    if (!modules.has(connection)) {
      modules.set(connection, {
        type: 'output',
        name: connection,
        connections: [],
      });
    }
  });

  [...modules.values()].forEach((module) => {
    module.connections.forEach((connection) => {
      const connectedModule = modules.get(connection)!;
      if (connectedModule.type === 'conjunction') {
        connectedModule.memory.set(module.name, 'low');
      }
    });
  });

  return modules;
};

export const multiplyLowAndHighPulsesSent = (modules: Modules) => {
  let lowPulses = 0;
  let highPulses = 0;
  for (let pulseIdx = 0; pulseIdx < 1000; pulseIdx++) {
    const { lowPulses: newLowPulses, highPulses: newHighPulses } =
      pressButton(modules);
    lowPulses += newLowPulses;
    highPulses += newHighPulses;
  }

  return lowPulses * highPulses;
};

export const minNumberOfButtonPressesToActivateSandMachine = (
  modules: Modules
) => {
  const moduleInputs = new Map<string, string[]>();
  [...modules.values()].forEach((module) => {
    module.connections.forEach((connection) => {
      if (!moduleInputs.has(connection)) {
        moduleInputs.set(connection, []);
      }
      moduleInputs.get(connection)!.push(module.name);
    });
  });
  const cycles = new Map<string, number>();
  const exitModule = getExitModule(modules)!;
  moduleInputs.get(exitModule.name)?.forEach((input) => {
    cycles.set(input, 0);
  });

  const onExitModuleReceivedHighPulse = (pulse: Pulse) => {
    cycles.set(
      pulse.source,
      cycles.get(pulse.source) === 0 ? buttonPresses : cycles.get(pulse.source)!
    );
  };

  let buttonPresses = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    ++buttonPresses;
    pressButton(modules, onExitModuleReceivedHighPulse);
    const machineActivatedAt = [...cycles.values()].reduce(
      (acc, current) => lcm(acc, current),
      1
    );
    if (machineActivatedAt) {
      return machineActivatedAt;
    }
  }
};

const pressButton = (
  modules: Modules,
  onExitModuleReceivedHighPulse?: (pulse: Pulse) => void
) => {
  const exitModule = getExitModule(modules);
  let lowPulses = 0;
  let highPulses = 0;
  const initial: Pulse = {
    type: 'low',
    source: 'button',
    target: 'broadcaster',
  };
  const queue = [initial];

  while (queue.length > 0) {
    const pulse = queue.shift()!;

    if (pulse.type === 'low') {
      lowPulses++;
    } else {
      highPulses++;
    }

    if (
      pulse.target === exitModule?.name &&
      pulse.type === 'high' &&
      onExitModuleReceivedHighPulse
    ) {
      onExitModuleReceivedHighPulse(pulse);
    }

    const module = modules.get(pulse.target)!;
    const processor = ModulePulseProcessors[module.type];
    if (processor) {
      processor(module, pulse, queue);
    }
  }
  return { lowPulses, highPulses };
};

const getExitModule = (modules: Modules) =>
  [...modules.values()].find((module) => module.connections.includes('rx'));

const processBroadcaster: ModulePulseProcessor = (module, pulse, queue) => {
  queue.push(
    ...module.connections.map((target) => ({
      type: pulse.type,
      target,
      source: module.name,
    }))
  );
};

const processFlipFlop: ModulePulseProcessor = (module, pulse, queue) => {
  if (module.type !== 'flip-flop' || pulse.type !== 'low') {
    return;
  }

  const prevState = module.state;
  module.state = !prevState;
  queue.push(
    ...module.connections.map((target) => ({
      type: prevState ? ('low' as const) : ('high' as const),
      target,
      source: module.name,
    }))
  );
};

const processConjunction: ModulePulseProcessor = (module, pulse, queue) => {
  if (module.type !== 'conjunction') {
    return;
  }

  module.memory.set(pulse.source, pulse.type);
  const allHigh = [...module.memory.values()].every(
    (pulseType) => pulseType === 'high'
  );
  queue.push(
    ...module.connections.map((target) => ({
      type: allHigh ? ('low' as const) : ('high' as const),
      target,
      source: module.name,
    }))
  );
};

const ModulePulseProcessors: Record<string, ModulePulseProcessor> = {
  broadcaster: processBroadcaster,
  'flip-flop': processFlipFlop,
  conjunction: processConjunction,
};

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

type ModulePulseProcessor = (
  module: Module,
  pulse: Pulse,
  queue: Pulse[]
) => void;

type Module =
  | BroadcastModule
  | OutputModule
  | FlipFlopModule
  | ConjunctionModule;
type Modules = Map<string, Module>;
type Pulse = {
  type: PulseType;
  target: string;
  source: string;
};

type BaseModule = {
  name: string;
  connections: string[];
};

type BroadcastModule = BaseModule & {
  type: 'broadcaster';
};

type OutputModule = BaseModule & {
  type: 'output';
};

type FlipFlopModule = BaseModule & {
  type: 'flip-flop';
  state: boolean;
};

type ConjunctionModule = BaseModule & {
  type: 'conjunction';
  memory: Map<string, PulseType>;
};

type PulseType = 'high' | 'low';
