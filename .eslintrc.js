module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@getify/proper-arrows',
    '@typescript-eslint',
    'import',
    'json',
    'prettier',
    'promise',
    'sonarjs',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:array-func/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: { alwaysTryTypes: true },
    },
    'import/extensions': ['.ts', '.d.ts', '.js'],
  },
  rules: {
    'array-func/prefer-array-from': 0,
    '@getify/proper-arrows/params': [
      'error',
      {
        unused: 'none',
        length: 2,
        count: 50,
      },
    ],
    '@getify/proper-arrows/name': 0,
    '@getify/proper-arrows/where': [
      'error',
      {
        global: true,
        property: false,
        export: false,
        trivial: false,
      },
    ],
    '@getify/proper-arrows/return': [
      'error',
      {
        trivial: false,
        chained: false,
        object: false,
        ternary: 1,
      },
    ],
    eqeqeq: 2,
    '@getify/proper-arrows/this': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'no-undef': 0,
    'no-console': 0,
    'arrow-parens': ['error', 'always'],
    curly: 0,
    'import/no-named-default': 2,
    'import/no-named-as-default': 0,
    'import/no-duplicates': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': [
      2,
      {
        ignore: ['.ttf$', '.png$', '.webp$', '.jpg$'],
      },
    ],
  },
}
