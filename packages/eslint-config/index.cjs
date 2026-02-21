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
    'no-useless-escape': 'off',
    'no-restricted-imports': ['error', {
      paths: [
        {
          name: 'b1dx/ui',
          message: 'Use @b1dx/ui instead of the legacy alias.'
        }
      ],
      patterns: [
        {
          group: ['b1dx/ui/*'],
          message: 'Use @b1dx/ui public exports only (no deep imports).'
        },
        {
          group: ['@b1dx/ui/*'],
          message: 'Use @b1dx/ui public exports only (no deep imports).'
        },
        {
          group: ['**/packages/ui/**', '**/packages/ui/src/**', '**/packages/ui/dist/**'],
          message: 'Do not import from packages/ui directly; use @b1dx/ui.'
        }
      ]
    }]
  },
  ignorePatterns: [
    'dist',
    'build',
    'node_modules'
  ]
};
