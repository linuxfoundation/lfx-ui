# Changelog Component

The changelog component provides an embeddable widget that displays published changelog entries for LFX products. It fetches data from the changelog API, renders markdown content with XSS protection, and supports light/dark theming.

## Basic Usage

### Angular Implementation

Import the component in your main module (main.ts):

```typescript
import '@linuxfoundation/lfx-ui-core';
```

Add `CUSTOM_ELEMENTS_SCHEMA` to your component:

```typescript
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<lfx-changelog product="easycla"></lfx-changelog>`,
})
export class MyComponent {}
```

### Vue Implementation

Configure custom elements in your vite config or main.ts:

```typescript
app.config.compilerOptions.isCustomElement = (tag) => tag === 'lfx-changelog';
```

Then use the component in your template:

```vue
<script setup>
import '@linuxfoundation/lfx-ui-core';
</script>

<template>
  <lfx-changelog product="easycla" theme="dark"></lfx-changelog>
</template>
```

### React Implementation

```typescript
import '@linuxfoundation/lfx-ui-core';

function App() {
  return <lfx-changelog product="easycla" theme="dark" limit="5" />;
}
```

### VanillaJS Implementation

Import the npm package using unpkg:

```html
<script src="https://unpkg.com/@linuxfoundation/lfx-ui-core@latest/dist/browser/changelog.bundle.js"></script>
```

Then, use the component in your HTML:

```html
<lfx-changelog product="easycla"></lfx-changelog>
```

## Attributes

| Attribute  | Type   | Required | Default                       | Description                       |
| ---------- | ------ | -------- | ----------------------------- | --------------------------------- |
| `product`  | string | Yes      | —                             | Product slug (see table below)    |
| `theme`    | string | No       | `"light"`                     | `"light"` or `"dark"`             |
| `limit`    | number | No       | `10`                          | Number of entries to show (max 25)|
| `base-url` | string | No       | `"https://changelog.lfx.dev"` | Override the API base URL         |

### Available Product Slugs

| Product                 | Slug                      |
| ----------------------- | ------------------------- |
| Changelog               | `changelog`               |
| Community Data Platform | `community-data-platform` |
| Crowdfunding            | `crowdfunding`            |
| EasyCLA                 | `easycla`                 |
| Individual Dashboard    | `individual-dashboard`    |
| Insights                | `insights`                |
| Mentorship              | `mentorship`              |
| Organization Dashboard  | `organization-dashboard`  |
| Project Control Center  | `project-control-center`  |

## Features

### Light and Dark Theme

Toggle the theme using the `theme` attribute:

```html
<!-- Light theme (default) -->
<lfx-changelog product="easycla"></lfx-changelog>

<!-- Dark theme -->
<lfx-changelog product="easycla" theme="dark"></lfx-changelog>
```

Theme changes are handled purely via CSS (`:host([theme="dark"])`) — no re-render or API call occurs when switching themes.

### Markdown Rendering

Changelog descriptions support full GitHub Flavored Markdown including headings, lists, code blocks, tables, images, and links. All HTML output is sanitized by DOMPurify for XSS protection.

### Loading, Error, and Empty States

The component handles all states automatically:

- **Loading**: Shows an animated skeleton while fetching data
- **Error**: Shows an error message with a retry button. Also fires a `changelog-load-error` custom event
- **Empty**: Shows a "No changelog entries found" message when the API returns zero results

### Error Handling

```javascript
const changelog = document.querySelector('lfx-changelog');

changelog.addEventListener('changelog-load-error', (event) => {
  console.error('Changelog load failed:', event.detail.message);
});
```

### Framework-Specific Attribute Binding

#### Angular

```typescript
@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <lfx-changelog
      [attr.product]="productSlug"
      [attr.theme]="isDark ? 'dark' : 'light'"
      [attr.limit]="entryLimit"
      [attr.base-url]="changelogApiUrl">
    </lfx-changelog>
  `,
})
export class ChangelogComponent {
  productSlug = 'easycla';
  isDark = false;
  entryLimit = 5;
  changelogApiUrl = environment.changelogApiUrl;
}
```

#### Vue

```vue
<template>
  <lfx-changelog
    :product="productSlug"
    :theme="isDark ? 'dark' : 'light'"
    :limit="entryLimit"
    :base-url="changelogApiUrl" />
</template>
```

## Styling and Customization

### CSS Custom Properties

| Property                            | Default (light)         | Description            |
| ----------------------------------- | ----------------------- | ---------------------- |
| `--lfx-changelog-font-family`      | `system-ui, sans-serif` | Font family            |
| `--lfx-changelog-font-size-base`   | `14px`                  | Base font size         |
| `--lfx-changelog-text-primary`     | `#1a1a2e`               | Primary text color     |
| `--lfx-changelog-text-secondary`   | `#64748b`               | Secondary text color   |
| `--lfx-changelog-text-muted`       | `#94a3b8`               | Muted text color       |
| `--lfx-changelog-text-link`        | `#3b82f6`               | Link color             |
| `--lfx-changelog-bg-surface`       | `#ffffff`               | Background color       |
| `--lfx-changelog-bg-surface-alt`   | `#f8fafc`               | Alternate background   |
| `--lfx-changelog-border-color`     | `#e2e8f0`               | Border color           |
| `--lfx-changelog-accent`           | `#3b82f6`               | Accent color           |
| `--lfx-changelog-accent-bg`        | `#eff6ff`               | Accent background      |
| `--lfx-changelog-border-radius`    | `12px`                  | Card border radius     |
| `--lfx-changelog-card-padding`     | `20px`                  | Card padding           |

### Theme Examples

#### Custom Accent Color

```html
<lfx-changelog
  product="easycla"
  style="
  --lfx-changelog-accent: #10b981;
  --lfx-changelog-accent-bg: #ecfdf5;
"></lfx-changelog>
```

#### Custom Font and Spacing

```html
<lfx-changelog
  product="easycla"
  style="
  --lfx-changelog-font-family: 'Inter', sans-serif;
  --lfx-changelog-border-radius: 8px;
  --lfx-changelog-card-padding: 24px;
"></lfx-changelog>
```

### CSS Parts

CSS parts provide fine-grained control over individual elements within the component.

| Part          | Description               |
| ------------- | ------------------------- |
| `container`   | Outer wrapper element     |
| `header`      | Header section            |
| `heading`     | The h2 heading text       |
| `list`        | Card list wrapper         |
| `card`        | Individual changelog card |
| `meta`        | Version + date row        |
| `version`     | Version badge             |
| `date`        | Date text                 |
| `title`       | Card title                |
| `description` | Markdown content area     |
| `footer`      | Footer section            |
| `link`        | "View all" link           |
| `loading`     | Loading skeleton          |
| `error`       | Error state               |
| `retry`       | Retry button              |
| `empty`       | Empty state               |

#### CSS Parts Example

```css
/* Add a left accent border to cards */
lfx-changelog::part(card) {
  border-left: 3px solid var(--lfx-changelog-accent);
}

/* Hide the date */
lfx-changelog::part(date) {
  display: none;
}

/* Custom version badge style */
lfx-changelog::part(version) {
  background: #fef3c7;
  color: #92400e;
}
```

### Design Token Integration

The component references global `--lfx-*` tokens as fallbacks, so it integrates with the LFX design system automatically:

```css
:root {
  --lfx-font-family: 'Open Sans', sans-serif;
  --lfx-font-size-base: 14px;
}

/* The changelog component will pick these up via its internal fallbacks */
```

## Accessibility Features

- **High Contrast Support**: Automatic styles for `prefers-contrast: high`
- **Reduced Motion**: Respects `prefers-reduced-motion` — disables animations
- **Semantic HTML**: Uses `<article>`, `<time>`, `<h2>`, `<h3>` elements
- **External Links**: Card and footer links include `rel="noopener noreferrer"` and `target="_blank"`. Markdown links with `target="_blank"` are automatically enforced with safe `rel` attributes

## Responsive Design

The component automatically adjusts for mobile devices:

- Reduced padding on screens under 768px
- Smaller heading font size on mobile
- Full-width layout with no horizontal overflow

## Development

To develop the component, run the following commands:

```bash
npm run build
npm run storybook
```

**Note**: The Storybook stories point to `http://localhost:4204` for the changelog API. Start the lfx-changelog backend before running Storybook to see live data.

### Available Stories

- **Default** — EasyCLA changelogs
- **DarkTheme** — Dark color scheme
- **LimitedEntries** — Show only 3 entries
- **InsightsProduct** — Insights product changelogs
- **MentorshipProduct** — Mentorship product changelogs
- **CustomAccent** — Dark theme with green accent
- **WithCSSParts** — Advanced styling with CSS parts
- **ErrorState** — Error display with retry button
- **MissingProduct** — Error when product attribute is missing
