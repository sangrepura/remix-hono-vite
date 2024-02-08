/** @type {import('eslint').Linter.Config}*/
module.exports = {
  root: true,
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
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
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  plugins: ["tailwindcss"],
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
    },
  },
  rules: {
    // Rules for all files
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "arrow-body-style": ["warn", "as-needed"],
    // Tailwind CSS
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        callees: ["cn", "cva"],
      },
    ],
    // TypeScript
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "all",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        ignoreRestSiblings: false,
      },
    ],
    // Import
    "import/no-default-export": "warn",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  ignorePatterns: [
    "/build",
    "/public/build",
    "*.config*",
    "/test/",
    "/public",
    ".*.js",
  ],
  overrides: [
    {
      // TypeScript files
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      extends: [
        "@remix-run/eslint-config",
        "@remix-run/eslint-config/node",
        "plugin:@typescript-eslint/recommended", // <-- Corrected
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:tailwindcss/recommended",
        "prettier",
      ],
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      plugins: ["@typescript-eslint"], // <-- Added
    },
    {
      // React files
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "@remix-run/eslint-config",
        "@remix-run/eslint-config/node",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },
    {
      // Node.js files
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
    },
    {
      // Overrides specific to certain files
      files: [
        "./app/root.tsx",
        "./app/entry.client.tsx",
        "./app/entry.server.tsx",
        "./app/routes/**/*.tsx",
        "./server/index.ts",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
