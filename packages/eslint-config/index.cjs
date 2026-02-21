module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-unused-vars': 'off',
    'no-useless-escape': 'off'
  },
  ignorePatterns: [
    'dist',
    'build',
    'node_modules'
  ]
};
