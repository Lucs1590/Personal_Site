const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    ignores: ["projects/**/*"]
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.json", "e2e/tsconfig.json"],
        createDefaultProgram: true
      }
    },
    rules: {
      "@typescript-eslint/explicit-member-accessibility": [
        "off",
        {
          "accessibility": "explicit"
        }
      ],
      "arrow-parens": [
        "off",
        "always"
      ],
      "import/order": "off",
      "jsdoc/newline-after-description": "off"
    }
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended
    ],
    rules: {}
  }
);