const input = 'hxbxwxba';

export const day11PartOne = () => getNextPassword(input);
export const day11PartTwo = () => getNextPassword(getNextPassword(input));

export const getNextPassword = (password: string) => {
  let newPassword = password;
  do {
    newPassword = increment(newPassword);
  } while (!isValidPassword(newPassword));
  return newPassword;
};

export const isValidPassword = (password: string) =>
  hasIncreasingStraight(password) &&
  !hasForbiddenLetters(password) &&
  hasTwoNonOverlappingPairs(password);

const hasIncreasingStraight = (password: string) =>
  Array.from(Array(password.length - 2)).some(
    (_, i) =>
      password.charCodeAt(i) + 1 === password.charCodeAt(i + 1) &&
      password.charCodeAt(i + 1) + 1 === password.charCodeAt(i + 2)
  );

const hasForbiddenLetters = (password: string) =>
  ['i', 'o', 'l'].some((letter) => password.includes(letter));

const hasTwoNonOverlappingPairs = (password: string) => {
  const pairs = password
    .split('')
    .slice(1)
    .filter((_, i) => password.charCodeAt(i) === password.charCodeAt(i + 1));
  return pairs.length >= 2 && pairs[0] !== pairs[1];
};

const increment = (password: string) => {
  const chars = password.split('');
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i];
    if (char === 'z') {
      chars[i] = 'a';
    } else {
      chars[i] = String.fromCharCode(char.charCodeAt(0) + 1);
      break;
    }
  }
  return chars.join('');
};
