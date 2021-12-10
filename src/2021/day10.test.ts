import { getFileSyntaxErrorScore } from './day10';

describe('getFileSyntaxErrorScore', () => {
  it('returns correct score for sample file', () => {
    const lines = [
      '[({(<(())[]>[[{[]{<()<>>',
      '[(()[<>])]({[<{<<[]>>(',
      '{([(<{}[<>[]}>{[]{[(<()>',
      '(((({<>}<{<{<>}{[]{[]{}',
      '[[<[([]))<([[{}[[()]]]',
      '[{[{({}]{}}([{[{{{}}([]',
      '{<[[]]>}<{[{[{[]{()[[[]',
      '[<(<(<(<{}))><([]([]()',
      '<{([([[(<>()){}]>(<<{{',
      '<{([{{}}[<[[[<>{}]]]>[]]',
    ];
    const score = getFileSyntaxErrorScore(lines);

    expect(score).toEqual(26397);
  });
});
