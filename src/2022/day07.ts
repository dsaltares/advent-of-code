import { readFileSync } from 'fs';

export const day07PartOne = () =>
  sumOfDirectoriesLessThan10K(readTerminalOutput());

export const day07PartTwo = () => sizeOfDirectoryToDelete(readTerminalOutput());

const readTerminalOutput = () =>
  parseTerminalOutput(readFileSync('./data/2022/day07.txt', 'utf-8'));

export const parseTerminalOutput = (input: string): Directory => {
  let root: Directory | undefined = undefined;
  let current: Directory;
  input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .forEach((line) => {
      const commandMatch = /\$ ([\w]+)( (.+))?/g.exec(line);
      if (commandMatch && commandMatch.length > 1) {
        const name = commandMatch[1];
        const arg = commandMatch[3];

        if (name === 'cd') {
          if (arg === '/') {
            if (!root) {
              root = {
                type: 'directory',
                name: '/',
                children: [],
              };
            }
            current = root;
          } else if (arg === '..' && current.parent) {
            current = current.parent;
          } else if (arg) {
            const child = current.children.find(
              (entry) => entry.type === 'directory' && entry.name === arg
            );
            if (child && child.type === 'directory') {
              current = child;
            }
          }
        }
      }

      const fileMatch = /([0-9]+) (.+)/g.exec(line);
      if (fileMatch && fileMatch.length > 2) {
        const name = fileMatch[2];
        const size = parseInt(fileMatch[1], 10);
        const exists = current.children.some((entry) => entry.name === name);
        if (!exists) {
          current.children.push({
            type: 'file',
            name,
            size,
          });
        }
      }

      const dirMatch = /dir (.+)/g.exec(line);
      if (dirMatch && dirMatch.length > 1) {
        const name = dirMatch[1];
        const exists = current.children.some((entry) => entry.name === name);
        if (!exists) {
          current.children.push({
            type: 'directory',
            name,
            parent: current,
            children: [],
          });
        }
      }
    });

  if (!root) {
    throw new Error('No root directory found');
  }

  return root;
};

export const sumOfDirectoriesLessThan10K = (root: Directory) => {
  const stack: Entry[] = [root];
  let sum = 0;
  while (stack.length > 0) {
    const entry = stack.pop();
    if (entry?.type === 'directory') {
      const size = directorySize(entry);
      if (size < 100000) {
        sum += size;
      }
      stack.push(...entry.children);
    }
  }
  return sum;
};

export const sizeOfDirectoryToDelete = (root: Directory) => {
  const totalSpace = 70000000;
  const requiredSpace = 30000000;
  const spaceToFree = directorySize(root) + requiredSpace - totalSpace;
  const sizes: number[] = [];
  const stack: Entry[] = [root];
  while (stack.length > 0) {
    const entry = stack.pop();
    if (entry?.type === 'directory') {
      sizes.push(directorySize(entry));
      stack.push(...entry.children);
    }
  }
  return sizes.sort((a, b) => a - b).find((size) => size >= spaceToFree);
};

const directorySize = (directory: Directory) => {
  const stack = [...directory.children];
  let size = 0;
  while (stack.length > 0) {
    const entry = stack.pop();
    if (entry?.type === 'file') {
      size += entry.size;
    } else if (entry?.type === 'directory') {
      stack.push(...entry.children);
    }
  }
  return size;
};

type Entry = File | Directory;

type File = {
  type: 'file';
  name: string;
  size: number;
};

type Directory = {
  type: 'directory';
  name: string;
  children: Entry[];
  parent?: Directory;
};
