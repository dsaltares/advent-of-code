import {
  getFileSyntaxErrorScore,
  getStackAutocompleteScore,
  getFileAutocompleteScore,
} from './day10';

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

describe('getFileSyntaxErrorScore', () => {
  it('returns correct score for sample file', () => {
    const score = getFileSyntaxErrorScore(lines);

    expect(score).toEqual(26397);
  });
});

describe('getStackAutocompleteScore', () => {
  it('returns correct scores for sample input', () => {
    expect(
      getStackAutocompleteScore(
        ['{', '{', '[', '[', '(', '{', '(', '['].reverse()
      )
    ).toEqual(288957);
  });
});

describe('getFileAutocompleteScore', () => {
  it('returns correct score for sample file', () => {
    const score = getFileAutocompleteScore(lines);

    expect(score).toEqual(288957);
  });
});
