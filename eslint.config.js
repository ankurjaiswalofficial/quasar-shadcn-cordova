import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginQuasar from '@quasar/app-vite/eslint'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    // ignores: []
  },

  ...pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  ...pluginVue.configs['flat/essential'],

  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
     '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  // https://github.com/vuejs/eslint-config-typescript
  ...vueTsEslintConfig({
    // Optional: extend additional configurations from typescript-eslint'.
    // Supports all the configurations in
    // https://typescript-eslint.io/users/configs#recommended-configurations
    extends: [
      // By default, only the 'recommendedTypeChecked' rules are enabled.
      'recommendedTypeChecked',
      // You can also manually enable the stylistic rules.
      // "stylistic",

      // Other utility configurations, such as 'eslintRecommended', (note that it's in camelCase)
      // are also extendable here. But we don't recommend using them directly.
    ],
  }),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    // add your custom rules here
    rules: {
      'vue/multi-word-component-names': 'off',
      'prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-namespace': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
      // '@typescript-eslint/no-empty-interface': 'off',
      // '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-empty-function': 'off',
      // '@typescript-eslint/no-this-alias': 'off',
      // '@typescript-eslint/no-unnecessary-condition': 'off',
      // '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      // '@typescript-eslint/no-unnecessary-type-constraint': 'off',
      // '@typescript-eslint/prefer-nullish-coalescing': 'off',
      // '@typescript-eslint/prefer-optional-chain': 'off',
      // '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      // '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      // '@typescript-eslint/promise-function-async': 'off',
      // '@typescript-eslint/require-array-sort-compare': 'off',
      // '@typescript-eslint/restrict-plus-operands': 'off',
      // '@typescript-eslint/restrict-template-expressions': 'off',
      // '@typescript-eslint/return-await': 'off',
      // '@typescript-eslint/strict-boolean-expressions': 'off',
      // '@typescript-eslint/switch-exhaustiveness-check': 'off',
      // '@typescript-eslint/unbound-method': 'off',
      // '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
]
