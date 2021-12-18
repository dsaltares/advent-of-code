import {
  createBitsFromHex,
  parseHeader,
  Packet,
  PacketType,
  parsePacket,
  sumVersions,
} from './day16';

describe('createBitsFromHex', () => {
  it('returns correct bit array from hex string', () => {
    const hex = 'D2FE28';
    const bits = createBitsFromHex(hex);

    expect(bits).toEqual([
      1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0,
    ]);
  });
});

describe('parseHeader', () => {
  it('parses the header of an operator', () => {
    const bits = [0, 0, 1, 1, 1, 0];
    const { header, newCursor } = parseHeader(bits, 0);

    expect(header).toEqual({
      type: PacketType.Operator,
      version: 1,
    });
    expect(newCursor).toEqual(6);
  });

  it('parses the header of a literal', () => {
    const bits = [0, 0, 1, 1, 0, 0];
    const { header, newCursor } = parseHeader(bits, 0);

    expect(header).toEqual({
      type: PacketType.Literal,
      version: 1,
    });
    expect(newCursor).toEqual(6);
  });
});

describe('parsePacket', () => {
  it('parses a literal value packet', () => {
    const bits = [
      1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0,
    ];
    const result = parsePacket(bits);
    const packet = result?.packet as Packet;

    expect(packet).toEqual({
      header: {
        version: 6,
        type: PacketType.Literal,
      },
      value: 2021,
      packets: [],
    });
  });

  it('parses an operator packet', () => {
    const bits = [
      0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
      1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    const result = parsePacket(bits);
    const packet = result?.packet as Packet;

    expect(packet).toEqual({
      header: {
        version: 1,
        type: PacketType.Operator,
      },
      packets: [
        {
          header: {
            version: 6,
            type: PacketType.Literal,
          },
          value: 10,
          packets: [],
        },
        {
          header: {
            version: 2,
            type: PacketType.Literal,
          },
          value: 20,
          packets: [],
        },
      ],
    });
  });
});

describe('sumVersions', () => {
  it('returns correct sum of versions for sample input', () => {
    const packet: Packet = {
      header: {
        version: 1,
        type: PacketType.Operator,
      },
      packets: [
        {
          header: {
            version: 6,
            type: PacketType.Literal,
          },
          value: 10,
          packets: [],
        },
        {
          header: {
            version: 2,
            type: PacketType.Literal,
          },
          value: 20,
          packets: [],
        },
      ],
    };
    const sum = sumVersions(packet);

    expect(sum).toEqual(9);
  });
});
