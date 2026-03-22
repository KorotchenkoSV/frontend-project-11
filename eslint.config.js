import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-alert': 'error',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.github/**',
      '*.min.js',
      'package*.json',
      'vite.config.js',
    ],
  },
]

