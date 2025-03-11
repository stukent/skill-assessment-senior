const IGNORE_EXT = [
  'svg',
  'png',
  'jpeg',
  'jpg',
  'gif',
  'mov',
  'webm',
  'md',
  'css',
  'less',
  'scss',
  'sass',
  'mp3',
  'ttf',
  'woff',
  'woff2',
  'json',
]

module.exports = {
  root: true,
  plugins: ['jest', 'unicorn', 'etc'],
  extends: [
    'eslint-config-universe/node',
    'eslint-config-universe/web',
    'eslint-config-universe/native',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:@typescript-eslint/disable-type-checked',
  ],
  settings: {
    react: {
      version: '18.2',
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'off',
    'react/jsx-curly-brace-presence': ['warn', { props: 'always', children: 'never' }],
    'react-hooks/exhaustive-deps': 'off',
    'import/namespace': 'off', // Performance issues.
    'import/first': 'off', // Conflicts with hoist-jest-mock.
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'index', 'sibling']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    '@typescript-eslint/no-redeclare': 'off', // TypeScript will handle this one.
    'unicorn/better-regex': 'error',
    'unicorn/no-instanceof-array': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-useless-fallback-in-spread': 'error',
    'unicorn/no-useless-length-check': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-some': 'error',
    'unicorn/prefer-export-from': 'error',
    'unicorn/prefer-negative-index': 'error',
    'etc/no-commented-out-code': 'error',
    'import/no-relative-packages': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@thesisedu/*/src'],
      },
    ],
  },
  overrides: [
    {
      files: ['server/**', 'core/**'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/no-unused-vars': 'off', // This is buggy with class decorators. TypeScript yells at us about this anyway.
      },
    },
    {
      files: ['*/*/stories/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off', // CSF3 format makes it hard to use hooks.
      },
    },
    {
      files: ['**/__e2e__/*.ts'],
      rules: {
        'jest/no-export': 'off',
      },
    },
    {
      files: ['*.e2e.ts', '*.e2e.tsx'],
      rules: {
        'jest/no-done-callback': 'off',
        'jest/no-export': 'error',
      },
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      extends: ['prettier'],
      rules: {
        'prettier/prettier': ['warn'],
      },
      parserOptions: {
        schema: [
          'server/schema.graphql',
        ],
        operations: ['web/queries/*.graphql', 'web/fragments.graphql'],
      },
    },
    {
      files: ['web/queries/*.graphql', 'fragments.graphql'],
      extends: 'plugin:@graphql-eslint/operations-recommended',
      rules: {
        '@graphql-eslint/no-unused-fragments': 'off',
        '@graphql-eslint/selection-set-depth': 'off',
        '@graphql-eslint/fields-on-correct-type': 'off', // This doesn't work with dynamic schema additions
        '@graphql-eslint/known-directives': [
          'error',
          {
            ignoreClientDirectives: ['connection'],
          },
        ],
        '@graphql-eslint/naming-convention': [
          'error',
          {
            OperationDefinition: 'camelCase',
          },
        ],
      },
    },
    {
      files: ['schema.graphql', 'with*.graphql', 'server/*/*.graphql'],
      extends: 'plugin:@graphql-eslint/schema-recommended',
      rules: {
        '@graphql-eslint/no-hashtag-description': 'off',
        '@graphql-eslint/require-description': 'off',
        '@graphql-eslint/strict-id-in-types': 'off',
        '@graphql-eslint/known-directives': 'off',
        '@graphql-eslint/no-unreachable-types': 'off', // This doesn't appear to be working
      },
    },
  ],
  globals: {
    f: 'readonly',
  },
  ignorePatterns: [
    '**/src/schema.tsx',
    '**/src/schema.ts',
    '**/LICENSE',
    ...IGNORE_EXT.map(ext => `**/*.${ext}`),
  ],
}
