import { readFileSync } from 'fs';

export const day13PartOne = () =>
  sumNumbersOfInOrderPacketPairs(readPacketPairs());

export const day13PartTwo = () => getDecoderKey(readPacketPairs());

const readPacketPairs = () =>
  parsePacketPairs(readFileSync('data/2022/day13.txt', 'utf8'));

export const parsePacketPairs = (input: string): PacketPair[] =>
  input
    .split('\n\n')
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) =>
      line.split('\n').map((packet) => JSON.parse(packet))
    ) as PacketPair[];

export const sumNumbersOfInOrderPacketPairs = (packetPairs: PacketPair[]) =>
  packetPairs
    .map(inOrder)
    .reduce((total, inOrder, idx) => (inOrder ? total + idx + 1 : total), 0);

const FirstDivider = [[2]];
const SecondDivider = [[6]];

export const getDecoderKey = (packetPairs: PacketPair[]) => {
  const packets = packetPairs.flat() as Packet[];
  packets.push(FirstDivider, SecondDivider);
  packets.sort(compare);
  return (
    (packets.findIndex(areEqual(FirstDivider)) + 1) *
    (packets.findIndex(areEqual(SecondDivider)) + 1)
  );
};

export const inOrder = ([left, right]: PacketPair): boolean =>
  compare(left, right) <= 0;

const compare = (left: Packet, right: Packet): number => {
  const isLeftNumber = typeof left === 'number';
  const isRightNumber = typeof right === 'number';
  if (isLeftNumber && isRightNumber) {
    return left - right;
  } else if (isLeftNumber && !isRightNumber) {
    return compare([left], right);
  } else if (!isLeftNumber && isRightNumber) {
    return compare(left, [right]);
  } else if (!isLeftNumber && !isRightNumber) {
    for (let idx = 0; idx < left.length; idx++) {
      if (idx >= right.length) {
        return 1;
      }
      if (idx < right.length) {
        const result = compare(left[idx], right[idx]);
        if (result !== 0) {
          return result;
        }
      }
    }
    return left.length === right.length ? 0 : -1;
  }
  return 0;
};

const areEqual = (target: Packet) => (current: Packet) =>
  JSON.stringify(target) === JSON.stringify(current);

type Packet = number | Packet[];
type PacketPair = [Packet, Packet];
