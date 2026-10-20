import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // The render loop (useFrame) and input handlers mutate a shared per-frame runtime object
    // and three.js uniforms on purpose, outside React state, to avoid re-rendering every frame.
    files: ['src/game/**/*.{js,jsx}'],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
]);
