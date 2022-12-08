import { getNextPassword, isValidPassword } from './day11';

describe('isValidPassword', () => {
  test.each([
    { password: 'hijklmmn', expected: false },
    { password: 'abbceffg', expected: false },
    { password: 'abbcegjk', expected: false },
    { password: 'abcdffaa', expected: true },
    { password: 'ghjaabcc', expected: true },
  ])(
    'returns whether $password is a valid password',
    ({ password, expected }) => {
      expect(isValidPassword(password)).toEqual(expected);
    }
  );
});

describe('getNextPassword', () => {
  test.each([
    { password: 'abcdefgh', expected: 'abcdffaa' },
    { password: 'ghijklmn', expected: 'ghjaabcc' },
  ])('returns the password after $password', ({ password, expected }) => {
    expect(getNextPassword(password)).toEqual(expected);
  });
});
