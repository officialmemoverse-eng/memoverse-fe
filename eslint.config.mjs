import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.yalc/**',
      '.claude/**',
      'out/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  js.configs.recommended,
  prettierConfig,
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
      // JavaScript
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'off',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
      'no-nested-ternary': 'warn',
      'max-depth': ['warn', 4],
      // 'no-useless-return': 'warn',
      // 'no-else-return': 'warn',
      'max-lines': ['error', { max: 250, skipComments: true, skipBlankLines: true }],

      // TypeScript rules
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],

      // React rules
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/purity': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'react/incompatible-library': 'off',

      '@next/next/no-img-element': 'off',

      'tailwindcss/suggestCanonicalClasses': 'off',

      // Prettier
      'prettier/prettier': 'warn',

      // React Hook Form
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            "VariableDeclarator[init.type='CallExpression'] ObjectPattern > Property[key.name='watch']",
          message:
            "Avoid destructuring 'watch' from React Hook Form — it re-renders on every field change. Use useWatch() to subscribe to specific fields instead.",
        },
        {
          selector: "CallExpression[callee.type='MemberExpression'][callee.property.name='watch']",
          message:
            'Avoid calling .watch() on a React Hook Form instance — it re-renders on every field change. Use useWatch() to subscribe to specific fields instead.',
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            {
              pattern: 'components',
              group: 'internal',
            },
            {
              pattern: 'common',
              group: 'internal',
            },
            {
              pattern: 'routes/ **',
              group: 'internal',
            },
            {
              pattern: 'assets/**',
              group: 'internal',
              position: 'after',
            },
      'max-lines': ['error', { max: 250, skipBlankLines: true, skipComments: true }],
    },
  }),
]

export default eslintConfig

