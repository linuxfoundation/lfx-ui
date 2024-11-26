# Footer Component

The footer component provides a consistent bottom section for your application. Here's how to implement it across different frameworks.

## Angular Implementation

Import the component in your main module (main.ts)

```typescript
import '@linuxfoundation/lfx-ui-core';
```

Then, use the component in your template:

```html
<lfx-footer></lfx-footer>
```

Example: [https://stackblitz.com/edit/stackblitz-starters-lr77kq?file=src%2Fmain.ts](https://stackblitz.com/edit/stackblitz-starters-lr77kq?file=src%2Fmain.ts)

## Vue Implementation

In your main.js file, import the component:

```typescript
import '@linuxfoundation/lfx-ui-core';
```

Then, use the component in your template:

```html
<lfx-footer />
```

Example: [https://stackblitz.com/edit/hf2wgy?file=src%2Fmain.js](https://stackblitz.com/edit/hf2wgy?file=src%2Fmain.js)

## VanillaJS Implementation

Import the npm package using unpkg:

```html
<script src="https://unpkg.com/@linuxfoundation/lfx-ui-core@latest/dist/browser/footer.bundle.js"></script>
```

Then, use the component in your HTML:

```html
<lfx-footer></lfx-footer>
```

Example: [https://stackblitz.com/edit/vitejs-vite-vn2ysk?file=index.html](https://stackblitz.com/edit/vitejs-vite-vn2ysk?file=index.html)

# Development

To develop the component, run the following commands:

```bash
npm run build
npm run storybook
```

This will build the component and start the storybook server. You can then navigate to [http://localhost:6006](http://localhost:6006) to view the component. Updates made to the component will be reflected live in the storybook environment.
