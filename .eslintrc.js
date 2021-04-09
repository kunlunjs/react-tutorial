module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    es6: true,
    jest: true,
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/consistent-indexed-object-style': 1,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/consistent-type-imports': 1,
    'jsx-a11y/anchor-is-valid': 0
  }
  // overrides: [
  //   {
  //     files: ['config/*.js'],
  //     rules: {
  //       'import/no-commonjs': 'off',
  //     },
  //   },
  // ],
  // settings: {
  //   react: {
  //     pragma: 'React',
  //     // React version. 'detect' automatically picks the version you have installed.
  //     // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
  //     // default to latest and warns if missing
  //     // It will default to 'detect' in the future
  //     version: 'detect',
  //   }
  // }
}
