module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-debugger': 'error',
        'no-duplicate-imports': ['error'],
        'prefer-const': 'error',
        'no-eval': 'error',
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off',
        'react/no-find-dom-node': 'off',
        'react/no-unescaped-entities': 'off',
        "react/display-name": "off",
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        jest: true,
    },
};
