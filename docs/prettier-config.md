# Prettier Configuration

The Prettier configuration provides a consistent code style across the projects.

## Configuration

The configuration is defined in `src/core/prettier-config/index.ts`.

## Usage

To use the configuration, add it to your `.prettierrc.js` file in the root of your project:

```javascript
module.exports = require('@linuxfoundation/lfx-ui-core/prettier-config');
```

Add the `.prettierignore` file to the root of your project to ignore files from formatting.

```bash
**/*.*
**/node_modules
**/dist
**/.angular/cache

!src/**/*.html
!src/**/*.ts
!src/**/*.tsx
!src/**/*.js
!src/**/*.jsx
!src/**/*.json
!src/**/*.css
!src/**/*.scss
!src/**/*.md
!src/**/*.mdx
```

> **Note:** The `.prettierignore` file must be present in the top-level directory of your workspace for these ignore patterns to take effect. If you open a workspace subfolder directly and it doesn't contain its own `.prettierignore` file, these ignore settings will not be applied.
