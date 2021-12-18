import {
  createBitsFromHex,
  parseHeader,
  Packet,
  PacketType,
  parsePacket,
  sumVersions,
  evalPacket,
  ParseResult,
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
      type: PacketType.LessThan,
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
        type: PacketType.LessThan,
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
        type: PacketType.GreaterThan,
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

describe('evalPacket', () => {
  const cases = [
    {
      hex: 'C200B40A82',
      expected: 3,
      name: '1 + 2',
    },
    {
      hex: '04005AC33890',
      expected: 54,
      name: '6 * 9',
    },
    {
      hex: '880086C3E88112',
      expected: 7,
      name: 'min(7, 8, 9)',
    },
    {
      hex: 'CE00C43D881120',
      expected: 9,
      name: 'max(7, 8, 9)',
    },
    {
      hex: 'D8005AC2A8F0',
      expected: 1,
      name: '5 < 15',
    },
    {
      hex: 'F600BC2D8F',
      expected: 0,
      name: '5 > 15',
    },
    {
      hex: '9C005AC2F8F0',
      expected: 0,
      name: '5 === 15',
    },
    {
      hex: '9C0141080250320F1802104A08',
      expected: 1,
      name: '1 + 3 === 2 * 2',
    },
  ];

  cases.forEach((testCase) => {
    test(`returns correct value for expression ${testCase.name}`, () => {
      const bits = createBitsFromHex(testCase.hex);
      const { packet } = parsePacket(bits) as ParseResult;
      const value = evalPacket(packet);

      expect(value).toEqual(testCase.expected);
    });
  });
});
