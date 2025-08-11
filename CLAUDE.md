# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Building and Development
```bash
# Full build (tokens, TypeScript, browser bundles)
npm run build

# Development with Storybook
npm start
# or
npm run storybook

# Build static Storybook
npm run build-storybook

# Format code with Prettier
npm run format

# Individual build steps
npm run build:tokens    # Generate design tokens from tokens.json
npm run build:browser   # Create browser-compatible bundles
```

## Architecture Overview

### Package Structure
This is a **LFX UI Core library** providing design tokens and vanilla web components for Linux Foundation projects. The package exports:
- Design tokens (primitive → semantic → component hierarchy)
- Vanilla web components (`lfx-footer`, `lfx-tools`)
- Prettier configuration
- Browser bundles for direct HTML usage

### Component Architecture
**Vanilla Web Components** with Shadow DOM:
- Components extend `HTMLElement` directly (no framework)
- Use Shadow DOM with `{ mode: 'open' }`
- Styles managed via `StylesheetManager` utility with constructible stylesheets
- Template-based rendering for performance
- Components self-register with `customElements.define()`

**Component Patterns**:
- Class names: `LFX` prefix + PascalCase (e.g., `LFXFooter`)
- Element tags: `lfx-` prefix + kebab-case (e.g., `lfx-footer`)
- Private members: underscore prefix (`_template`, `_handleClick`)
- Lifecycle: constructor → connectedCallback → disconnectedCallback
- Attribute observation via `observedAttributes` and `attributeChangedCallback`

### Design Token System
Three-layer token hierarchy:
1. **Primitive tokens**: Base design values (colors, spacing)
2. **Semantic tokens**: Purpose-driven tokens referencing primitives
3. **Component tokens**: Component-specific tokens referencing semantics

Token build process (`src/scripts/build.ts`):
- Reads `src/design/tokens/tokens.json`
- Generates TypeScript modules with type safety
- Creates `lfxPreset` for easy consumption

### Build System
- **TypeScript**: Target ES2020, CommonJS modules, strict mode
- **Browser bundles**: Browserify + tsify for each component
- **Storybook**: Web components with Vite, autodocs enabled
- **Distribution**: Supports NPM, browser bundles, and CDN usage

## Key Implementation Details

### Web Component Standards
- Comprehensive JSDoc with `@element`, `@csspart`, `@cssproperty`, `@attr`, `@fires`
- Shadow DOM template created in constructor, rendered in connectedCallback
- Event listener cleanup in disconnectedCallback
- CSS custom properties for theming with `--lfx-` prefix
- Accessibility: ARIA attributes, keyboard navigation, high contrast support

### StylesheetManager Utility
Located at `src/core/styles/stylesheet-utils.ts`:
- Handles constructible stylesheets with fallback
- Provides caching for performance
- Prevents duplicate stylesheets
- Usage: `StylesheetManager.applyStyles(shadowRoot, style, 'component-id')`

### Cookie Consent Integration
The `lfx-footer` component includes optional Osano cookie consent:
- Activated via `cookie-tracking` attribute
- Dynamically loads Osano script
- Provides "Manage cookie preferences" link
- Hides widget, uses drawer for preferences

### External Services
Components support external service integration:
- **Font Awesome Pro**: Kit ID loaded via `font-awesome-kit-id` attribute
- **Google Fonts**: Automatically loaded when specified in icon service
- Scripts loaded once globally, available to all component instances

## Testing and Quality

### Linting and Formatting
Always run after changes:
```bash
npm run format
```

### Component Testing Checklist
- Custom element registration
- Attribute/property handling
- Event dispatching
- Shadow DOM structure
- CSS custom property theming
- Accessibility features
- Responsive behavior
- Lifecycle methods

### Git Commit Standards
- Sign off all commits with `--signoff`
- Use conventional commit format
- Don't add Claude as co-author
- No auto-generated commit messages

## Important Notes
- This is a **library package**, not an application
- Components are **framework-agnostic** vanilla web components
- All components use **Shadow DOM** for encapsulation
- Styles use **CSS custom properties** for theming
- Build outputs to `dist/` directory for NPM publishing
- Browser bundles available in `dist/browser/`