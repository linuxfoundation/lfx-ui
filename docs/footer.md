# Footer Component

The footer component provides a consistent bottom section for your application with comprehensive styling options. Here's how to implement and customize it across different frameworks.

## Basic Usage

### Angular Implementation

Import the component in your main module (main.ts):

```typescript
import '@linuxfoundation/lfx-ui-core';
```

Then, use the component in your template:

```html
<lfx-footer></lfx-footer>
```

Example: [https://stackblitz.com/edit/stackblitz-starters-lr77kq?file=src%2Fmain.ts](https://stackblitz.com/edit/stackblitz-starters-lr77kq?file=src%2Fmain.ts)

### Vue Implementation

In your main.js file, import the component:

```typescript
import '@linuxfoundation/lfx-ui-core';
```

Then, use the component in your template:

```html
<lfx-footer />
```

Example: [https://stackblitz.com/edit/hf2wgy?file=src%2Fmain.js](https://stackblitz.com/edit/hf2wgy?file=src%2Fmain.js)

### VanillaJS Implementation

Import the npm package using unpkg:

```html
<script src="https://unpkg.com/@linuxfoundation/lfx-ui-core@latest/dist/browser/footer.bundle.js"></script>
```

Then, use the component in your HTML:

```html
<lfx-footer></lfx-footer>
```

Example: [https://stackblitz.com/edit/vitejs-vite-vn2ysk?file=index.html](https://stackblitz.com/edit/vitejs-vite-vn2ysk?file=index.html)

## Styling and Customization

The footer component is highly customizable using CSS custom properties. Here are the available styling options:

### CSS Custom Properties

| Property                        | Description           | Default                   |
| ------------------------------- | --------------------- | ------------------------- |
| `--lfx-footer-bg`               | Background color      | `transparent`             |
| `--lfx-footer-text`             | Text color            | `#808b91`                 |
| `--lfx-footer-link-color`       | Link color            | `#5b6367`                 |
| `--lfx-footer-link-hover-color` | Link hover color      | `#5b6367`                 |
| `--lfx-footer-padding`          | Padding around footer | `3rem 2rem 0 2rem`        |
| `--lfx-footer-font-size`        | Font size             | `0.75rem`                 |
| `--lfx-footer-font-family`      | Font family           | `'Open Sans', sans-serif` |
| `--lfx-footer-text-align`       | Text alignment        | `center`                  |
| `--lfx-footer-max-width`        | Maximum width         | `none`                    |
| `--lfx-footer-line-height`      | Line height           | `1.5`                     |

### Theme Examples

#### Light Theme

```html
<lfx-footer
  style="
  --lfx-footer-bg: #f8f9fa;
  --lfx-footer-padding: 2rem;
"></lfx-footer>
```

#### Dark Theme

```html
<lfx-footer
  style="
  --lfx-footer-bg: #2d3748;
  --lfx-footer-text: #e2e8f0;
  --lfx-footer-link-color: #3B82F6;
  --lfx-footer-link-hover-color: #2563eb;
  --lfx-footer-padding: 2rem;
"></lfx-footer>
```

#### High Contrast (Accessibility)

```html
<lfx-footer
  style="
  --lfx-footer-bg: #000000;
  --lfx-footer-text: #ffffff;
  --lfx-footer-link-color: #ffff00;
  --lfx-footer-link-hover-color: #ffff80;
  --lfx-footer-padding: 2rem;
  --lfx-footer-font-size: 1rem;
"></lfx-footer>
```

#### Minimal Style

```html
<lfx-footer
  style="
  --lfx-footer-bg: transparent;
  --lfx-footer-padding: 2rem;
  --lfx-footer-font-size: 0.7rem;
"></lfx-footer>
```

#### Large Text (Accessibility)

```html
<lfx-footer
  style="
  --lfx-footer-bg: #f7fafc;
  --lfx-footer-font-size: 1.125rem;
  --lfx-footer-padding: 3rem 2rem;
"></lfx-footer>
```

#### Left Aligned

```html
<lfx-footer
  style="
  --lfx-footer-bg: #edf2f7;
  --lfx-footer-text-align: left;
  --lfx-footer-padding: 2rem;
"></lfx-footer>
```

#### Compact Version

```html
<lfx-footer
  style="
  --lfx-footer-bg: #f1f5f9;
  --lfx-footer-padding: 1rem;
  --lfx-footer-font-size: 0.625rem;
"></lfx-footer>
```

### Framework-Specific Styling

#### Angular

```typescript
// In your component CSS
lfx-footer {
  --lfx-footer-bg: var(--app-background-secondary);
  --lfx-footer-text: var(--app-text-secondary);
  --lfx-footer-link-color: var(--app-primary);
}
```

#### Vue

```vue
<template>
  <lfx-footer :style="footerStyles" />
</template>

<script>
export default {
  computed: {
    footerStyles() {
      return {
        '--lfx-footer-bg': this.$theme.colors.background,
        '--lfx-footer-text': this.$theme.colors.text,
        '--lfx-footer-link-color': this.$theme.colors.primary,
      };
    },
  },
};
</script>
```

### Design Token Integration

The footer works seamlessly with design token systems:

```css
/* Define your design tokens */
:root {
  --color-background-secondary: #f7fafc;
  --color-text-secondary: #718096;
  --color-primary: #3182ce;
  --spacing-lg: 2rem;
  --font-size-sm: 0.875rem;
}

/* Apply to footer */
lfx-footer {
  --lfx-footer-bg: var(--color-background-secondary);
  --lfx-footer-text: var(--color-text-secondary);
  --lfx-footer-link-color: var(--color-primary);
  --lfx-footer-padding: var(--spacing-lg);
  --lfx-footer-font-size: var(--font-size-sm);
}
```

### Advanced Styling with CSS Parts

CSS parts provide fine-grained control over individual elements within the footer component.

#### Basic CSS Parts Example

```css
/* Style the main footer element */
lfx-footer::part(footer) {
  border-top: 3px solid #e53e3e;
  border-radius: 8px 8px 0 0;
}

/* Style the copyright text */
lfx-footer::part(copyright) {
  font-weight: 600;
  letter-spacing: 0.025em;
}

/* Style individual links */
lfx-footer::part(link) {
  font-weight: bold;
  border-bottom: 1px dotted currentColor;
  transition: all 0.2s ease;
}
```

#### Advanced CSS Parts Example

```css
/* Create a card-style footer with gradient background */
lfx-footer::part(footer) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  margin: 1rem;
  position: relative;
}

/* Add a decorative accent line */
lfx-footer::part(footer)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #ffd700;
  border-radius: 0 0 3px 3px;
}

/* Style the content wrapper with backdrop blur */
lfx-footer::part(footer-content) {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  margin: 1rem;
}

/* Enhanced text styling */
lfx-footer::part(copyright) {
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Pill-style links with hover effects */
lfx-footer::part(link) {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-decoration: none;
  margin: 0 0.25rem;
  display: inline-block;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

lfx-footer::part(link):hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}
```

#### Complete Example with HTML

```html
<style>
  .advanced-footer lfx-footer::part(footer) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    margin: 1rem;
  }

  .advanced-footer lfx-footer::part(footer-content) {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    margin: 1rem;
  }

  .advanced-footer lfx-footer::part(link) {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    text-decoration: none;
    margin: 0 0.25rem;
    transition: all 0.3s ease;
  }
</style>

<div class="advanced-footer">
  <lfx-footer
    style="
    --lfx-footer-text: white;
    --lfx-footer-link-color: #ffd700;
    --lfx-footer-link-hover-color: #ffed4e;
    --lfx-footer-padding: 2rem;
  "></lfx-footer>
</div>
```

### Available CSS Parts

| Part                  | Description                  |
| --------------------- | ---------------------------- |
| `footer`              | The main footer element      |
| `footer-content`      | The content wrapper          |
| `copyright-container` | Container for copyright text |
| `copyright`           | The copyright paragraph      |
| `link`                | Individual footer links      |

## Accessibility Features

The footer component includes built-in accessibility features:

- **Semantic HTML**: Uses proper `<footer>` element with `role="contentinfo"`
- **High Contrast Support**: Automatic styles for high contrast mode
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Focus Management**: Proper focus indicators for links
- **Screen Reader Friendly**: Appropriate text structure and link context

## Responsive Design

The footer automatically adjusts for mobile devices:

- Smaller padding on mobile devices
- Responsive font sizes
- Mobile-specific CSS custom properties:
  - `--lfx-footer-padding-mobile`
  - `--lfx-footer-font-size-mobile`
  - `--lfx-footer-text-align-mobile`

## Development

To develop the component, run the following commands:

```bash
npm run build
npm run storybook
```

This will build the component and start the storybook server. You can then navigate to [http://localhost:6006](http://localhost:6006) to view the component with all styling variations. Updates made to the component will be reflected live in the storybook environment.

### Available Stories

The Storybook includes these comprehensive examples:

- **Default** - Basic footer without custom styling
- **LightTheme** - Clean light color scheme
- **DarkTheme** - Modern dark theme
- **HighContrast** - Accessibility-focused high contrast
- **Minimal** - Transparent, minimal styling
- **LargeText** - Larger text for accessibility
- **LeftAligned** - Left-aligned text layout
- **Compact** - Smaller, more compact version
- **WithDesignTokens** - Integration with design token system
- **WithCSSParts** - Advanced styling with CSS parts
- **MobileOptimized** - Mobile-specific styling

Each story is interactive and allows you to experiment with different CSS custom properties in real-time.
