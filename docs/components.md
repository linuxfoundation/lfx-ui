# LFX UI Core Components

This document provides an overview of all available components in the LFX UI Core package.

## Available Components

### Footer Component (`lfx-footer`)

A comprehensive footer component that provides consistent copyright and legal information across LFX applications.

**Key Features:**

- **Cookie Consent Integration**: Optional Osano cookie consent script loading
- **Extensive Customization**: CSS custom properties for complete theming
- **Accessibility**: Built-in accessibility features and semantic HTML
- **Responsive Design**: Mobile-optimized with responsive breakpoints
- **CSS Parts**: Fine-grained styling control with CSS parts

**Usage:**

```html
<!-- Basic usage -->
<lfx-footer></lfx-footer>

<!-- With cookie tracking enabled -->
<lfx-footer cookie-tracking></lfx-footer>

<!-- With custom styling -->
<lfx-footer style="--lfx-footer-bg: #f8f9fa; --lfx-footer-padding: 2rem;" cookie-tracking></lfx-footer>
```

**Documentation:** [Footer Component](footer.md)

### Tools Component (`lfx-tools`)

A tools menu component that provides a grid icon button that opens a dropdown menu with various LFX tools and applications.

**Key Features:**

- **Dynamic Menu**: Configurable menu structure with sections and items
- **Font Awesome Integration**: Support for Font Awesome Pro icons
- **Active State Management**: Automatic highlighting of current product
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Customizable Styling**: CSS custom properties for theming

**Usage:**

```html
<!-- Basic usage -->
<lfx-tools></lfx-tools>

<!-- With Font Awesome kit -->
<lfx-tools kit="your-kit-id"></lfx-tools>

<!-- With active product -->
<lfx-tools product="lfx-insights"></lfx-tools>
```

**Documentation:** [Tools Component](tools.md)

## Component Features Overview

| Feature               | Footer | Tools |
| --------------------- | ------ | ----- |
| Cookie Tracking       | ✅     | ❌    |
| CSS Custom Properties | ✅     | ✅    |
| CSS Parts             | ✅     | ✅    |
| Accessibility         | ✅     | ✅    |
| Responsive Design     | ✅     | ✅    |
| Framework Agnostic    | ✅     | ✅    |
| TypeScript Support    | ✅     | ✅    |

## Installation and Setup

### Basic Installation

```bash
npm install @linuxfoundation/lfx-ui-core
```

### Import Components

```typescript
// Import all components
import '@linuxfoundation/lfx-ui-core';

// Or import individual components
import '@linuxfoundation/lfx-ui-core/dist/components/footer';
import '@linuxfoundation/lfx-ui-core/dist/components/tools';
```

### Framework Integration

#### Angular

```typescript
// In main.ts or app.module.ts
import '@linuxfoundation/lfx-ui-core';
```

#### Vue

```typescript
// In main.js
import '@linuxfoundation/lfx-ui-core';
```

#### React

```typescript
// In your main component or index file
import '@linuxfoundation/lfx-ui-core';
```

## Design System Integration

All components are built to work seamlessly with the LFX design system:

- **Design Tokens**: Components use semantic design tokens for consistent theming
- **Theme Support**: Automatic integration with PrimeOne theme system
- **Customization**: Extensive CSS custom properties for framework-specific theming
- **Accessibility**: Built-in accessibility features following WCAG guidelines

## Development

### Storybook

Run Storybook to explore all components and their variations:

```bash
npm run storybook
```

Navigate to [http://localhost:6006](http://localhost:6006) to view the component library.

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

## Contributing

When adding new components:

1. Follow the established component structure and patterns
2. Include comprehensive JSDoc documentation
3. Create Storybook stories for all variations
4. Add accessibility features and tests
5. Update this documentation
6. Follow the TypeScript and vanilla web component standards

## Browser Support

All components support:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - see [LICENSE](../LICENSE) for details.
