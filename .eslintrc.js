module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort', 'jsx-a11y', '@typescript-eslint', 'compat'],
  extends: [
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:compat/recommended',
    'plugin:json/recommended',
    'prettier',
  ],
  settings: {
    'import/extensions': ['.ts', '.tsx', '.js'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.ts', '.tsx'],
      },
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'separate-type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: '*.test.*',
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended'],
    },
  ],
};
