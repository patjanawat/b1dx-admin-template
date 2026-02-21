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
          group: ['b1dx/ui/src/*'],
          message: 'Do not import from b1dx/ui/src; use @b1dx/ui public exports.'
        },
        {
          group: ['b1dx/ui/*'],
          message: 'Use @b1dx/ui public exports only (no deep imports).'
        },
        {
          group: ['@b1dx/ui/*'],
          message: 'Use @b1dx/ui public exports only (no deep imports).'
        },
        {
          group: ['@b1dx/ui/src/*'],
          message: 'Do not import from @b1dx/ui/src; use @b1dx/ui public exports.'
        },
        {
          group: [
            '**/packages/ui/**',
            '**/packages/ui/src/**',
            '**/packages/ui/dist/**',
            'packages/ui/src/*',
            '../*/packages/ui/src/*'
          ],
          message: 'Do not import from packages/ui directly; use @b1dx/ui.'
        },
        {
          group: ['**/packages/ui/src/*', '**/packages/ui/src/**', '../../packages/ui/src/*'],
          message: 'Do not import from packages/ui/src; use @b1dx/ui.'
        },
        {
          group: ['@b1dx/ui/components/ui/*', '**/components/ui/*'],
          message: 'Do not import UI primitives directly; use App* wrappers via @b1dx/ui.'
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
