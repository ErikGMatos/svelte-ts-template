module.exports = {
  extends: ['rocketseat'],
  rules: {
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 140],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert'],
    ],
  },
};
