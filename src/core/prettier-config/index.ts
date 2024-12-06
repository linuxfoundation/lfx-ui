// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

const prettierConfig = {
  // 160 is the default for the LF Design System
  printWidth: 160,
  // Use single quotes for strings
  singleQuote: true,
  // Use spaces instead of tabs
  useTabs: false,
  // Set tab width to 2 spaces
  tabWidth: 2,
  // Add semicolons at the end of statements
  semi: true,
  // Add spaces inside brackets
  bracketSpacing: true,
  // Add parentheses around arrow function parameters
  arrowParens: 'always',
  // Use ES5 trailing commas
  trailingComma: 'es5',
  // Put the closing bracket on the same line as the last element
  bracketSameLine: true,
  // Use LF line endings
  endOfLine: 'lf',
  // Override settings for specific file types
  overrides: [
    {
      files: ['*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
};

module.exports = prettierConfig;
export type PrettierConfig = typeof prettierConfig;
