// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Config } from 'prettier';

const prettierConfig: Config = {
  printWidth: 160,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  arrowParens: 'always',
  trailingComma: 'none',
  bracketSameLine: true
};

module.exports = prettierConfig;
