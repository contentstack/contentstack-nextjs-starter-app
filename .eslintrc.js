/* eslint-disable prettier/prettier */
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ['plugin:prettier/recommended', 'airbnb'],
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "react/prefer-stateless-function": [0, { ignorePureComponents: true }],
    "react/prop-types": [0],
    'func-names': ['error', 'never'],
    quotes: 'off',
    'prettier/prettier': 'off',
    'prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'eslint-disable-next-line jsx-a11y/anchor-is-valid': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
  },
};
