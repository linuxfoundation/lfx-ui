# LFX UI Core

A package that contains core functionality for LFX UI products. It includes design tokens and PrimeOne theme configuration that is shared across LFX UI products.

## Overview

### Design Tokens

This package contains design tokens and PrimeTek theme configuration that is shared across LFX UI products.

The generated tokens are organized into three layers:

- **Primitive Tokens**: Base-level design values (colors, spacing, typography, etc.)
- **Semantic Tokens**: Purpose-driven tokens that reference primitive tokens
- **Component Tokens**: Component-specific tokens that reference semantic tokens

## Installation

```bash
npm install @linuxfoundation/lfx-ui-core
```

## Documentation

- Configurations
  - [Design Tokens](docs/design-tokens.md)
  - [Prettier Configuration](docs/prettier-config.md)
- Components
  - [Footer Component](docs/footer.md)

## Contributing

### Prerequisites

- Node.js 20.x
- npm

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/linuxfoundation/lfx-ui
cd lfx-ui-core
```

2. Install dependencies:

```bash
npm ci
```

3. Build the tokens and components:

```bash
npm run build
```

### Making Changes

1. The source tokens are defined in `src/design/tokens/tokens.json`
2. Modify the tokens file according to your needs, or update it in Figma using Tokens Studio
3. Run the build script to generate updated token files:

```bash
npm run build
```

### Release Process

1. Create a new version tag following semver conventions:

```bash
git tag v1.0.0
git push origin v1.0.0
```

2. The GitHub Action will automatically:
   - Build the package
   - Update the version
   - Publish to npm

### Guidelines

- Follow semantic versioning for releases
- Update documentation when adding new token categories
- Add comments to explain complex token relationships
- Test tokens in a real application before releasing
