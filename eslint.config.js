// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const fsdPlugin = require('./fsd/eslint-rules/eslint-plugin-fsd-architecture.js');
const importPlugin = require('eslint-plugin-import');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        ignores: ['fsd/**/*'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
        },
        plugins: {
            fsd: fsdPlugin,
            import: importPlugin,
        },
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            'fsd/no-upper-layer-imports': 'error',
            'fsd/no-cross-layer-imports': 'error',
            'fsd/public-api-imports': 'error',
            'import/no-relative-packages': 'error',
            'import/no-relative-parent-imports': 'error',
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
);
