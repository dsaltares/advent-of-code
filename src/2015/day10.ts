const input = '1113222113';

export const day10PartOne = () => runLookAndSay(input, 40).length;
export const day10PartTwo = () => runLookAndSay(input, 50).length;

const runLookAndSay = (sequence: string, times: number) => {
  let newSequence = sequence;
  for (let i = 0; i < times; i++) {
    newSequence = lookAndSay(newSequence);
  }
  return newSequence;
};

export const lookAndSay = (sequence: string) => {
  const newSequence: string[] = [];
  let currentChar = sequence[0];
  let currentCount = 1;
  for (let i = 1; i < sequence.length; i++) {
    const char = sequence[i];
    if (char === currentChar) {
      currentCount++;
    } else {
      newSequence.push(currentCount.toString());
      newSequence.push(currentChar);
      currentChar = char;
      currentCount = 1;
    }
  }
  newSequence.push(currentCount.toString());
  newSequence.push(currentChar);
  return newSequence.join('');
};
