const baseConfig = require('@b1dx/eslint-config');
const baseRestrictedImports = baseConfig.rules?.['no-restricted-imports']?.[1];

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'no-restricted-imports': ['error', {
      paths: baseRestrictedImports?.paths ?? [],
      patterns: [
        ...(baseRestrictedImports?.patterns ?? []),
        {
          group: ['next/*', 'next/**'],
          message: 'packages/ui must not import from next/*.'
        }
      ]
    }]
  }
};


