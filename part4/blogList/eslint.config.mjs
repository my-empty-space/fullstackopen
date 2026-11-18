import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['node_modules/**']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-unused-vars': [
        'warn', // o "warn"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_', // Opcional: también ignora variables normales con _
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
