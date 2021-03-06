/* eslint-disable prefer-const */
import { readFileSync } from 'fs';

export enum PacketType {
  Sum = 0,
  Product = 1,
  Minimum = 2,
  Maximum = 3,
  Literal = 4,
  GreaterThan = 5,
  LessThan = 6,
  Equal = 7,
}

export type Header = {
  version: number;
  type: PacketType;
};

export type Packet = {
  header: Header;
  value?: number;
  packets: Packet[];
};

export type ParseResult = {
  packet: Packet;
  newCursor: number;
};

const VersionLength = 3;
const TypeLength = 3;
const TotalSubpacketBitsLength = 15;
const NumberOfSubpacketsLength = 11;

export const createBitsFromHex = (input: string) =>
  input
    .split('')
    .map((hex) => parseInt(hex, 16))
    .map((decimal) => decimal.toString(2).padStart(4, '0'))
    .flatMap((binaryGroup) => binaryGroup.split(''))
    .map((binary) => parseInt(binary, 10));

const readBitArray = () =>
  createBitsFromHex(
    readFileSync('./data/2021/day16.txt', 'utf-8').replace(/\s/g, '')
  );

const numberFromBits = (bits: number[]) => parseInt(bits.join(''), 2);

export const parseHeader = (bits: number[], cursor: number) => {
  const version = numberFromBits(bits.slice(cursor, cursor + VersionLength));
  const type = numberFromBits(
    bits.slice(cursor + VersionLength, cursor + VersionLength + TypeLength)
  );
  return {
    newCursor: cursor + VersionLength + TypeLength,
    header: {
      version,
      type,
    },
  };
};

const parseLiteral = (bits: number[], cursor: number) => {
  let newCursor = cursor;
  let isLast = false;
  const literalBits = [];
  while (!isLast) {
    isLast = bits[newCursor] === 0;
    literalBits.push(...bits.slice(newCursor + 1, newCursor + 5));
    newCursor += 5;
  }

  return {
    value: numberFromBits(literalBits),
    newCursor,
  };
};

const parseSubpacketsTotalLengthMode = (bits: number[], cursor: number) => {
  const totalLength = numberFromBits(
    bits.slice(cursor, cursor + TotalSubpacketBitsLength)
  );
  let newCursorStart = cursor + TotalSubpacketBitsLength;
  let newCursor = newCursorStart;
  let diff = 0;
  const packets: Packet[] = [];
  do {
    let packet: Packet;
    ({ packet, newCursor } = parsePacket(bits, newCursor) as ParseResult);
    packets.push(packet);
    diff = newCursor - newCursorStart;
  } while (diff < totalLength);

  return {
    packets,
    newCursor,
  };
};

const parseSubpacketsNumberPacketsMode = (bits: number[], cursor: number) => {
  const numSubpackets = numberFromBits(
    bits.slice(cursor, cursor + NumberOfSubpacketsLength)
  );
  let newCursor = cursor + NumberOfSubpacketsLength;
  const packets = Array.from(Array(numSubpackets)).map(() => {
    let packet: Packet;
    ({ packet, newCursor } = parsePacket(bits, newCursor) as ParseResult);
    return packet;
  });
  return { packets, newCursor };
};

const parseOperator = (bits: number[], cursor: number) => {
  const lengthTypeId = bits[cursor];
  let newCursor = cursor + 1;
  return lengthTypeId === 0
    ? parseSubpacketsTotalLengthMode(bits, newCursor)
    : parseSubpacketsNumberPacketsMode(bits, newCursor);
};

export const parsePacket = (
  bits: number[],
  cursor = 0
): ParseResult | undefined => {
  if (cursor >= bits.length) {
    return;
  }

  let newCursor = cursor;
  let header: Header;
  ({ header, newCursor } = parseHeader(bits, newCursor));
  switch (header.type) {
    case PacketType.Literal: {
      let value: number;
      ({ value, newCursor } = parseLiteral(bits, newCursor));
      return {
        packet: {
          header,
          value,
          packets: [],
        },
        newCursor,
      };
    }
    default: {
      let packets: Packet[];
      ({ packets, newCursor } = parseOperator(bits, newCursor));
      return {
        packet: {
          header,
          packets,
        },
        newCursor,
      };
    }
  }
};

export const sumVersions = (packet: Packet): number =>
  packet.header.version +
  packet.packets.reduce((sum, subpacket) => sum + sumVersions(subpacket), 0);

export const evalPacket = (packet: Packet): number => {
  switch (packet.header.type) {
    case PacketType.Sum:
      return packet.packets.reduce(
        (sum, current) => sum + evalPacket(current),
        0
      );
    case PacketType.Product:
      return packet.packets.reduce(
        (product, current) => product * evalPacket(current),
        1
      );
    case PacketType.Minimum:
      return Math.min(...packet.packets.map(evalPacket));
    case PacketType.Maximum:
      return Math.max(...packet.packets.map(evalPacket));
    case PacketType.Literal:
      return packet.value as number;
    case PacketType.GreaterThan:
      return evalPacket(packet.packets[0]) > evalPacket(packet.packets[1])
        ? 1
        : 0;
    case PacketType.LessThan:
      return evalPacket(packet.packets[0]) < evalPacket(packet.packets[1])
        ? 1
        : 0;
    case PacketType.Equal:
      return evalPacket(packet.packets[0]) === evalPacket(packet.packets[1])
        ? 1
        : 0;
    default:
      return 0;
  }
};

const day16 = () => {
  const bits = readBitArray();
  const { packet } = parsePacket(bits) as ParseResult;
  return sumVersions(packet);
};

export const day16PartTwo = () => {
  const bits = readBitArray();
  const { packet } = parsePacket(bits) as ParseResult;
  return evalPacket(packet);
};

export default day16;
