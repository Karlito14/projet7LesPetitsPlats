module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'eol-last': 0,
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        'linebreak-style': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-console': 'off',
        'object-curly-newline': 'off',
    },
};
