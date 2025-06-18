# LFX Tools Component

A dropdown menu component with grid icon trigger for LFX applications.

## Features

- Grid icon button matching LFX design system
- Dropdown menu with organized sections
- Font Awesome Pro icons
- Custom Font Awesome kit support via `kit` attribute
- Product selection via `product` attribute to highlight active menu items
- External link indicators
- Keyboard navigation support
- Responsive design
- Accessible with ARIA attributes
- Smooth animations
- Click-outside-to-close functionality
- CSS custom properties for theming
- CSS parts for fine-grained styling

## Installation

```bash
npm install @linuxfoundation/lfx-ui-core
```

## Font Awesome Integration

The component uses Font Awesome Pro icons.

### Priority Order

1. **Default (Recommended)**: Assumes Font Awesome Pro is already loaded by your application
2. **Kit Attribute**: Only loads a kit if explicitly provided

### Default Behavior

By default, assumes you have already loaded Font Awesome Pro in your application:

```html
<!-- Assumes FA Pro is already loaded by your app -->
<lfx-tools></lfx-tools>
```

### Custom Kit Loading

Only provide a kit ID if Font Awesome is NOT already loaded by your application:

```html
<!-- Only use this if FA is not already loaded -->
<lfx-tools kit="your-kit-id"></lfx-tools>
```

### Programmatic Kit Setting

```typescript
const tools = document.querySelector('lfx-tools');
// Only set kit if FA is not already loaded
tools.kit = 'your-kit-id';
```

## Basic Usage

### Default (assumes FA already loaded)

```html
<lfx-tools></lfx-tools>
```

### With custom kit (only if FA not loaded)

```html
<lfx-tools kit="your-kit-id"></lfx-tools>
```

### With product selection

```html
<!-- Highlight the Drive menu item as active -->
<lfx-tools product="drive"></lfx-tools>

<!-- Highlight the EasyCLA menu item as active -->
<lfx-tools product="easycla"></lfx-tools>
```

### Import

```typescript
import '@linuxfoundation/lfx-ui-core/components/tools';
```

## Default Menu Structure

The component comes with the standard LFX tools menu:

- **Community**

  - Crowdfunding
  - Drive
  - Individual Dashboard
  - Insights
  - Mentorship

- **Organizations**

  - Organization Dashboard

- **Projects**
  - Community Data
  - EasyCLA
  - Project Control Center
  - Security

## Product Selection

The `product` attribute allows you to highlight a specific menu item as active, giving it the same styling as hover/focus states.

### Available Product Values

| Product ID               | Menu Item              |
| ------------------------ | ---------------------- |
| `crowdfunding`           | Crowdfunding           |
| `drive`                  | Drive                  |
| `individual-dashboard`   | Individual Dashboard   |
| `insights`               | Insights               |
| `mentorship`             | Mentorship             |
| `organization-dashboard` | Organization Dashboard |
| `community-data`         | Community Data         |
| `easycla`                | EasyCLA                |
| `project-control-center` | Project Control Center |
| `security`               | Security               |

### Usage Examples

```typescript
import { LFXTools, MenuSection, MenuItem } from '@linuxfoundation/lfx-ui-core/components/tools';

// Get component reference
const tools = document.querySelector('lfx-tools') as LFXTools;

// Set custom Font Awesome kit
tools.kit = 'your-kit-id';

// Set active product
tools.product = 'drive';

// Set custom menu data
const customMenu: MenuSection[] = [
  {
    section: 'Development',
    items: [
      {
        label: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com',
        target: '_blank',
      },
    ],
  },
];

tools.menuData = customMenu;

// Listen to events
tools.addEventListener('menu-opened', (e: CustomEvent) => {
  console.log('Menu state:', e.detail.isOpen);
});
```

### Programmatic Product Setting

```typescript
const tools = document.querySelector('lfx-tools') as LFXTools;

// Set active product
tools.product = 'drive';

// Clear active product
tools.product = null;
```

### Active State Styling

When a product is selected, the corresponding menu item receives:

- Blue background (`#ECF4FF`)
- Bold text (font-weight: 600)
- Blue icon color (`#0061A3`)
- Same visual treatment as hover/focus states

## Customization

### Custom Menu Data

```typescript
import { LFXTools } from '@linuxfoundation/lfx-ui-core/components/tools';

const customMenu = [
  {
    section: 'My Tools',
    items: [
      {
        label: 'Custom Tool',
        icon: 'fa-solid fa-gear',
        url: '/custom-tool',
        target: '_self',
      },
    ],
  },
];

const toolsElement = document.querySelector('lfx-tools') as LFXTools;
toolsElement.menuData = customMenu;
```

**Note**: The `menuData` setter includes comprehensive validation to ensure data integrity. Invalid data structures will be rejected with detailed error messages in the console, preventing runtime errors.

### Styling with CSS Custom Properties

```css
lfx-tools {
  --lfx-tools-button-size: 32px;
  --lfx-tools-button-bg: transparent;
  --lfx-tools-button-hover-bg: #ecf4ff;
  --lfx-tools-button-radius: 4px;
  --lfx-tools-icon-color: #666666;
  --lfx-tools-icon-hover-color: #333;
  --lfx-tools-menu-bg: #ffffff;
  --lfx-tools-menu-width: 240px;
  --lfx-tools-menu-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --lfx-tools-menu-radius: 8px;
  --lfx-tools-menu-border: #e1e5e9;
  --lfx-tools-menu-text: #111827;
  --lfx-tools-menu-hover-bg: #ecf4ff;
  --lfx-tools-menu-hover-text: #111827;
  --lfx-tools-menu-active-bg: #ecf4ff;
  --lfx-tools-menu-active-text: #111827;
  --lfx-tools-menu-icon-active-color: #0061a3;
  --lfx-tools-section-header-color: #111827;
  --lfx-tools-font-family: 'Open Sans', sans-serif;
}
```

### Available CSS Custom Properties

| Property                             | Description                 | Default                          |
| ------------------------------------ | --------------------------- | -------------------------------- |
| `--lfx-tools-button-size`            | Size of the trigger button  | `32px`                           |
| `--lfx-tools-button-bg`              | Button background color     | `transparent`                    |
| `--lfx-tools-button-hover-bg`        | Button hover background     | `#ECF4FF`                        |
| `--lfx-tools-button-radius`          | Button border radius        | `4px`                            |
| `--lfx-tools-icon-color`             | Grid icon color             | `#666666`                        |
| `--lfx-tools-icon-hover-color`       | Grid icon hover color       | `#333`                           |
| `--lfx-tools-menu-bg`                | Menu background color       | `#ffffff`                        |
| `--lfx-tools-menu-width`             | Menu width                  | `240px`                          |
| `--lfx-tools-menu-shadow`            | Menu box shadow             | `0 4px 20px rgba(0, 0, 0, 0.15)` |
| `--lfx-tools-menu-radius`            | Menu border radius          | `8px`                            |
| `--lfx-tools-menu-border`            | Menu border color           | `#e1e5e9`                        |
| `--lfx-tools-menu-text`              | Menu text color             | `#111827`                        |
| `--lfx-tools-menu-hover-bg`          | Menu item hover background  | `#ECF4FF`                        |
| `--lfx-tools-menu-hover-text`        | Menu item hover text color  | `#111827`                        |
| `--lfx-tools-menu-active-bg`         | Menu item active background | `#ECF4FF`                        |
| `--lfx-tools-menu-active-text`       | Menu item active text color | `#111827`                        |
| `--lfx-tools-menu-icon-active-color` | Menu item active icon color | `#0061A3`                        |
| `--lfx-tools-section-header-color`   | Section header color        | `#111827`                        |
| `--lfx-tools-font-family`            | Font family                 | `'Open Sans', sans-serif`        |

### Styling with CSS Parts

```css
lfx-tools::part(button) {
  border: 2px solid #0066cc;
}

lfx-tools::part(icon) {
  color: #0066cc;
}

lfx-tools::part(menu) {
  border: 2px solid #0066cc;
  background: linear-gradient(180deg, #ffffff, #f0fdf4);
}

lfx-tools::part(menu-section) {
  border-bottom: 1px solid #e1e5e9;
}

lfx-tools::part(menu-item):hover {
  background: linear-gradient(90deg, #ecfdf5, #d1fae5);
}

lfx-tools::part(menu-link) {
  font-weight: 500;
}
```

### Available CSS Parts

| Part           | Description                 |
| -------------- | --------------------------- |
| `button`       | The menu trigger button     |
| `icon`         | The grid icon               |
| `menu`         | The dropdown menu container |
| `menu-section` | Individual menu sections    |
| `menu-item`    | Individual menu items       |
| `menu-link`    | Menu item links             |

## Events

### menu-opened

Fired when the menu opens:

```typescript
document.querySelector('lfx-tools').addEventListener('menu-opened', (event) => {
  console.log('Menu opened:', event.detail);
});
```

### menu-closed

Fired when the menu closes:

```typescript
document.querySelector('lfx-tools').addEventListener('menu-closed', (event) => {
  console.log('Menu closed:', event.detail);
});
```

## TypeScript

### Interfaces

```typescript
// MenuItem interface
interface MenuItem {
  label: string;
  icon: string;
  url: string;
  target: '_blank' | '_self';
  styleClass?: string;
  product?: string; // Optional product identifier for active state
}

// MenuSection interface
interface MenuSection {
  section: string;
  items: MenuItem[];
}
```

### Usage Examples

```typescript
import { LFXTools, MenuSection, MenuItem } from '@linuxfoundation/lfx-ui-core/components/tools';
```

## Framework Integration

### Angular

```typescript
// app.module.ts
import '@linuxfoundation/lfx-ui-core/components/tools';

// In your component template
<lfx-tools
  [menuData]="customMenuData"
  [product]="activeProduct"
  (menu-opened)="onMenuOpened($event)"
  (menu-closed)="onMenuClosed($event)">
</lfx-tools>
```

### Vue 3

```vue
<template>
  <lfx-tools :menuData="customMenuData" :product="activeProduct" @menu-opened="onMenuOpened" @menu-closed="onMenuClosed"> </lfx-tools>
</template>

<script setup>
import '@linuxfoundation/lfx-ui-core/components/tools';
import { ref } from 'vue';

const customMenuData = ref([...]);
const activeProduct = ref('drive');

const onMenuOpened = (event) => {
  console.log('Menu opened:', event.detail);
};
</script>
```

### React

```jsx
import { useEffect, useRef } from 'react';
import '@linuxfoundation/lfx-ui-core/components/tools';

function MyComponent() {
  const toolsRef = useRef(null);
  const activeProduct = 'drive';

  useEffect(() => {
    const tools = toolsRef.current;

    const handleMenuOpened = (e) => {
      console.log('Menu opened:', e.detail);
    };

    tools?.addEventListener('menu-opened', handleMenuOpened);

    return () => {
      tools?.removeEventListener('menu-opened', handleMenuOpened);
    };
  }, []);

  return <lfx-tools ref={toolsRef} product={activeProduct}></lfx-tools>;
}
```

## Accessibility

The component includes built-in accessibility features:

- ARIA labels for screen readers
- Keyboard navigation support (Tab, Enter, Escape)
- Focus management
- High contrast mode support
- Semantic HTML structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports both light and dark themes
- Responsive design for mobile and desktop
- Graceful degradation for older browsers

## License

This component is part of the LFX UI Core library and follows the same licensing terms.

## Data Validation

The component includes comprehensive validation for the `menuData` property to prevent runtime errors:

### Validation Rules

- **Top-level**: Must be an array of `MenuSection` objects
- **Section**: Must have a non-empty `section` string and an array of `items`
- **Items**: Each item must have:
  - `label`: Non-empty string
  - `icon`: Non-empty string
  - `url`: Non-empty string
  - `target`: Must be either `'_blank'` or `'_self'`
  - `styleClass` (optional): Non-empty string if provided
  - `product` (optional): Non-empty string if provided

### Error Handling

Invalid data will be rejected with detailed console error messages indicating the exact location and nature of the validation failure. The component will continue to use existing data rather than crashing.

### Example Validation Error

```javascript
// This will be rejected with a console error
const invalidData = [
  {
    section: '', // Empty section name
    items: [
      {
        label: 'Test',
        icon: 'fa-test',
        url: 'https://example.com',
        target: '_invalid', // Invalid target
      },
    ],
  },
];

tools.menuData = invalidData;
// Console: "LFXTools: menuData[0].section must be a non-empty string"
```
