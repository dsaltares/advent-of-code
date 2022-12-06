import { readFileSync } from 'fs';

const START_OF_PACKET_SIZE = 4;
const START_OF_MESSAGE_SIZE = 14;

export const day06PartOne = () => {
  const data = readData();
  return getIndexAfterStartOfPacket(data);
};

export const day06PartTwo = () => {
  const data = readData();
  return getIndexAfterStartOfMessage(data);
};

const readData = () => parseData(readFileSync('data/2022/day06.txt', 'utf8'));

export const parseData = (input: string) =>
  input.replace('\n', '').trim().split('');

export const getIndexAfterStartOfPacket = (data: string[]) =>
  getIndexAfterSection(data, START_OF_PACKET_SIZE);

export const getIndexAfterStartOfMessage = (data: string[]) =>
  getIndexAfterSection(data, START_OF_MESSAGE_SIZE);

const getIndexAfterSection = (data: string[], sectionSize: number) =>
  data.findIndex((_value, index) => {
    const section = data.slice(index, index + sectionSize);
    return section.length === [...new Set(section)].length;
  }) + sectionSize;
