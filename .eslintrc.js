// https://typescript-eslint.io/getting-started
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser', // vue-eslint-parser is a dependencies of eslint-plugin-vue https://www.npmjs.com/package/vue-eslint-parser
  extends: [
    // Plugins for vue
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'eslint:recommended',
    // Plugins for Typescript
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // PLugin for import extensions https://www.npmjs.com/package/eslint-plugin-import
    'plugin:import/typescript',
    'plugin:import/recommended',
    // Eslint airbnb config
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    // find the tsconfig.json nearest each source file
    project: true,
    extraFileExtensions: ['.vue'], // https://typescript-eslint.io/docs/linting/troubleshooting/#i-use-a-framework-like-vue-that-requires-custom-file-extensions-and-i-get-errors-like-you-should-add-parseroptionsextrafileextensions-to-your-config
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    // https://eslint.org/docs/latest/rules/linebreak-style#using-this-rule-with-version-control-systems
    'linebreak-style': 0,
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    // Tweak ban-ts-comment rule options to allow every justified exception
    // ts-ignore and ts-nocheck are still useful in our codebase when importing .js files into a .ts
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': true,
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': true,
        minimumDescriptionLength: 3,
      },
    ],
    // About axios should be listed in the project's dependencies. https://stackoverflow.com/a/44939592
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      // You will also need to install and configure the TypeScript resolver
    //  See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
      typescript: true,
      node: true,
    },
  },
};
