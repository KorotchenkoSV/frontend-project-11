import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
  // Стилистические правила
  stylistic.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    trailingComma: 'es5',
  }),

  // Основные правила для JS‑файлов
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

  // Игнорируемые файлы и папки
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
];
