import jest from 'eslint-plugin-jest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import babelEslintParser from '@babel/eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('airbnb-base'),
  {
    plugins: {
      jest,
    },

    languageOptions: {
      parser: babelEslintParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-import-assertions'],
        },
      },
      ecmaVersion: 'latest',
      globals: {
        ...jest.environments.globals.globals,
        import: 'readonly',
      },
    },

    rules: {
      'no-underscore-dangle': 'off',
      'no-use-before-define': 'off',
      'no-continue': 'off',
      'no-restricted-syntax': ['off', 'ForOfLoop'],
      'no-restricted-globals': ['off', 'isNaN'],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
    },
  },
  eslintConfigPrettier,
];
