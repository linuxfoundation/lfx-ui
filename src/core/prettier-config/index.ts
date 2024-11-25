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
