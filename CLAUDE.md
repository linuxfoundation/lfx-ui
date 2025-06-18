# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LFX UI Core is a TypeScript-based Web Components library providing design tokens, shared configurations, and reusable components for Linux Foundation Experience (LFX) UI products.

## Development Commands

### Build Commands

- `npm run build` - Full build pipeline (tokens → format → compile → bundle)
- `npm run build:tokens` - Generate TypeScript from design tokens JSON
- `npm run build:browser` - Create browser bundles using Browserify
- `npm run prepare` - Runs full build (automatically runs on install)

### Development

- `npm run storybook` - Start Storybook development server on port 6006
- `npm run build-storybook` - Build static Storybook
- `npm run format` - Format code with Prettier

### Package Management

- Uses **Yarn 4.9.0** (specified in `packageManager` field)
- Use `yarn` commands instead of `npm` for package management
- `npm ci` for clean dependency installation

## Architecture

### Design Token System

Three-tier token architecture defined in `src/design/tokens/tokens.json`:
1. **Primitive Tokens**: Base values (colors, spacing, typography)
2. **Semantic Tokens**: Purpose-driven tokens referencing primitives
3. **Component Tokens**: Component-specific tokens referencing semantic tokens

Tokens are compiled to TypeScript modules via `src/scripts/build.ts`.

### Web Components

- Native Custom Elements with Shadow DOM
- Framework-agnostic (vanilla JS/TS)
- Located in `src/components/`
- Bundled for browser usage with Browserify + Tsify

### Key Directories

- `src/components/` - Web Components library
- `src/design/tokens/` - Design tokens (JSON source + generated TS)
- `src/core/prettier-config/` - Shared Prettier configuration
- `src/scripts/` - Build automation scripts
- `dist/` - Compiled output (auto-generated)

### Package Exports

- Main: `./dist/index.js` (core functionality)
- Components: `./dist/components/index.js`
- Prettier config: `./dist/core/prettier-config/index.js`

## Development Notes

### Making Token Changes

1. Edit `src/design/tokens/tokens.json`
2. Run `npm run build:tokens` to regenerate TypeScript
3. Run full build with `npm run build`

### TypeScript Configuration

- Target: ES2020, Module: CommonJS
- Strict mode enabled
- Declarations generated to `dist/`

### Release Process

- Follow semantic versioning
- Create git tags (e.g., `v1.0.0`)
- GitHub Actions handles automated npm publishing

### Git Integration

For all git commits, use the `--signoff` option for DCO and the `-S` for signed commits. If a Jira ticket is mentioned in the prompt, ensure the Jira ticket identifier and link are included in the commit message.

Review the git branch name. If a Jira ticket number is provided and is not included in the branch name, prompt and suggest to the user a better branch name that includes the Jira ticket identifier in the name. A bad branch name example is ‘feature/update-cookie-policy’. A better branch name example would be ‘feature/LH-2-update-cookie-policy’, where the format is ‘feature/{JIRA_TICKET_IDENTIFIER}-{feature-short-name}’ or ‘bug/{JIRA_TICKET_IDENTIFIER}-{bug-short-name}.

### Jira Integration

When a Jira ticket is mentioned, ask the user if we should update the corresponding Jira ticket to indicate it is ‘In Progress’. Ask the user if a comment should be added to the Jira ticket after successfully completing a task or activity. If the user agrees, then build a progress report and submit this comment to the Jira ticket.

When a Jira ticket is mentioned, review the Jira ticket description. If the Jira ticket description does not include a ‘Acceptance Criteria’ section, then prompt the user to add one. Each ticket should have some completion criteria.

When a Jira ticket is mentioned, review the Jira ticket description. If the Jira ticket description does not include a ‘Reviewers/Stakeholders’ section, then prompt the user to add one. Each ticket should know who can validate and confirm that the feature was implemented or the bug fix was resolved.

When a pull request is created and a Jira ticket is associated with the work, confirm and add the GitHub pull request to the Jira as a comment.
