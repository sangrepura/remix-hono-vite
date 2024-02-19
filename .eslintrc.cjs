/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },
    // Base config
    extends: [
        '@remix-run/eslint-config',
        '@remix-run/eslint-config/node',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['tailwindcss'],
    settings: {
        tailwindcss: {
            callees: ['cn', 'cva'],
        },
    },
    rules: {
        // Rules for all files
        // This rule just enforces a consistent width
        // Prettier actually formats the code with the JSDoc plugin
        // Note: `//` style comments are not supported in JSDoc
        'max-len': [
            'error',
            {
                code: 80,
                ignoreUrls: false,
                ignoreComments: false,
                ignoreTrailingComments: false,
            },
        ], // Enforce a maximum line length
        // Disallow console except for warnings and errors
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ],
        // Require arrow function bodies only when necessary
        'arrow-body-style': ['warn', 'as-needed'],

        // Tailwind CSS
        'tailwindcss/no-custom-classname': [
            'warn',
            {
                callees: ['cn', 'cva'],
            },
        ],

        // TypeScript
        // Disallow duplicate imports
        '@typescript-eslint/no-duplicate-imports': 'error',
        '@typescript-eslint/consistent-type-imports': [
            'error',
            {
                // Enforce consistent type import style
                fixStyle: 'inline-type-imports',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'all',
                argsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                ignoreRestSiblings: false,
            },
        ],

        // Import
        'import/no-default-export': 'warn', // Disallow default exports
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                bracketSameLine: true,
                tabWidth: 4,
                printWidth: 80,
                jsdocCommentLineStrategy: 'multiline',
                useTabs: false,
                semi: false,
                singleQuote: true,
                trailingComma: 'es5',
                jsxSingleQuote: false,
                arrowParens: 'avoid',
                endOfLine: 'lf',
                plugins: ['prettier-plugin-jsdoc'],
            },
        ],
    },
    ignorePatterns: [
        '/build',
        '/public/build',
        '*.config*',
        '/test/',
        '/public',
        '.*.js',
    ],
    overrides: [
        {
            // TypeScript files
            files: ['**/*.ts'],
            parser: '@typescript-eslint/parser',
            extends: [
                '@remix-run/eslint-config',
                '@remix-run/eslint-config/node',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/recommended',
                'plugin:import/typescript',
                'plugin:prettier/recommended',
                'prettier',
            ],
            settings: {
                'import/internal-regex': '^~/',
                'import/resolver': {
                    node: {
                        extensions: ['.ts'],
                    },
                    typescript: {
                        alwaysTryTypes: true,
                    },
                },
            },
            plugins: ['@typescript-eslint'], // Enable TypeScript ESLint plugin
        },
        {
            // TypeScript + React files
            files: ['**/*.tsx'],
            // Enable React and JSX accessibility plugins
            plugins: ['react', 'jsx-a11y'],
            extends: [
                '@remix-run/eslint-config',
                '@remix-run/eslint-config/node',
                'plugin:react/jsx-runtime',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
            ],
            settings: {
                react: {
                    version: 'detect', // Detect the React version
                },
                formComponents: ['Form'], // Specify form components
                linkComponents: [
                    {
                        name: 'Link',
                        linkAttribute: 'to',
                    },
                    {
                        name: 'NavLink',
                        linkAttribute: 'to',
                    },
                ], // Specify link components
                'import/resolver': {
                    typescript: {}, // Specify TypeScript resolver
                },
            },
        },
        {
            // Node.js files
            files: ['*.cjs'],
            env: {
                node: true, // Enable Node.js global variables
            },
        },
        {
            // Overrides specific to certain files
            files: [
                './app/root.tsx',
                './app/entry.client.tsx',
                './app/entry.server.tsx',
                './app/routes/**/*.tsx',
                './server/index.ts',
            ],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
}
