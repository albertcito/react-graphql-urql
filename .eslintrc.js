module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
    "import",
    "react-hooks"
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/errors",
    "plugin:import/typescript"
  ],
  rules: {
    "max-len": [2, 120],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/button-has-type": 0,
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "import/no-extraneous-dependencies": ["error"],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "PascalCase", "UPPER_CASE"],
        "trailingUnderscore": "allow",
      }
    ],
    "jsx-a11y/label-has-associated-control": [ 2, {
      "labelComponents": ["Label"],
      "labelAttributes": ["title"],
      "depth": 3
    }],
    "object-curly-newline": [2, { "multiline": true }],
    "unicorn/filename-case": 0,
    "unicorn/prefer-query-selector": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "whitelist": {
          "props": true,
          "otherProps": true,
          "hoverRef": true,
          "useCombinedRefs": true,
          "targetRef": true,
          "refs": true,
          "ref": true
        }
      }
    ],
    "eslint-comments/disable-enable-pair": ["error", {"allowWholeFile": true}],
    "import/order": ["error", {
      "groups": [
        ["external", "builtin"],
        ["internal", "index", "sibling", "parent"]
      ],
      "newlines-between": "always"
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "project": "src"
      }
    }
  },
  "parserOptions": {
    "project":["tsconfig.json"]
  },
}