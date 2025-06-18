# LFX UI Core

A package that contains core functionality for LFX UI products. It includes
design tokens and PrimeOne theme configuration that is shared across
LFX UI products.

## Overview

### Design Tokens

This package contains design tokens and PrimeTek theme configuration that is
shared across LFX UI products.

The generated tokens are organized into three layers:

- **Primitive Tokens**: Base-level design values (colors, spacing, typography, etc.)
- **Semantic Tokens**: Purpose-driven tokens that reference primitive tokens
- **Component Tokens**: Component-specific tokens that reference semantic tokens

## Installation

```bash
npm install @linuxfoundation/lfx-ui-core
```

## Components

### Footer Component with Cookie Management

The LFX Footer component provides a consistent footer across all LFX
applications with integrated cookie consent management powered by Osano.

#### Basic Usage

```html
<!-- Basic footer without cookie management -->
<lfx-footer></lfx-footer>

<!-- Footer with cookie management enabled -->
<lfx-footer cookie-management-enabled="true"></lfx-footer>

<!-- Footer with custom cookie script -->
<lfx-footer 
  cookie-management-enabled="true"
  custom-cookie-script-url="https://custom.domain.com/cookie-script.js">
</lfx-footer>
```

#### Configuration Options

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `cookie-management-enabled` | `boolean` | `false` | Enable/disable cookie management functionality |
| `custom-cookie-script-url` | `string` | Osano default | Custom cookie script URL override |

#### Events

| Event | Description | Detail |
|-------|-------------|--------|
| `cookie-script-loaded` | Fired when cookie script loads successfully | `{ scriptUrl: string }` |
| `cookie-script-error` | Fired when cookie script fails to load | `{ scriptUrl: string, error: string }` |

#### Cookie Management Integration

The footer component automatically integrates with Osano's cookie consent \
platform when enabled. The default script supports:

- **Supported Domains**: lfx.dev, lfx.linuxfoundation.org, openprofile.dev, insights.linuxfoundation.org
- **Compliance**: GDPR, CCPA, and other privacy regulations
- **Customization**: Full cookie categorization and user preference management

#### JavaScript Usage

```javascript
// Enable cookie management programmatically
const footer = document.querySelector('lfx-footer');
footer.cookieManagementEnabled = true;

// Listen for script load events
footer.addEventListener('cookie-script-loaded', (event) => {
  console.log('Cookie script loaded from:', event.detail.scriptUrl);
});

footer.addEventListener('cookie-script-error', (event) => {
  console.error('Cookie script failed to load:', event.detail.error);
});
```

#### Environment-Specific Configuration

The footer component supports different configurations for various deployment environments:

**Production Environments:**

```html
<!-- Production LFX domains (lfx.linuxfoundation.org, lfx.dev) -->
<lfx-footer cookie-management-enabled="true"></lfx-footer>
```

**Development/Staging:**

```html
<!-- Development with custom script for testing -->
<lfx-footer 
  cookie-management-enabled="true"
  custom-cookie-script-url="https://staging-domain.com/cookie-script.js">
</lfx-footer>
```

**Supported Domains:**

- `lfx.dev` - Development environment
- `lfx.linuxfoundation.org` - Production environment  
- `openprofile.dev` - OpenProfile development
- `insights.linuxfoundation.org` - LFX Insights production

#### Deployment Considerations

**Before Deployment:**

1. Verify the target domain is configured in Osano's admin panel
2. Test cookie consent functionality in staging environment
3. Ensure proper CSP headers allow script loading from Osano domains
4. Validate that cookie categories align with your privacy policy

**Security Headers:**

```http
Content-Security-Policy: script-src 'self' https://cmp.osano.com; 
```

**Performance:**

- The cookie script loads asynchronously and won't block page rendering
- Script cleanup prevents memory leaks when components are removed
- Error handling ensures graceful degradation if script fails to load

## Testing

### Test Framework

The project uses a comprehensive testing setup with **Jest** and \
**TypeScript** for Web Components testing:

- **Framework**: Jest with ts-jest preset
- **Environment**: JSDOM for browser simulation
- **Coverage**: 98% code coverage on components
- **Test Files**: Located in `test/unit/` directory

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run only cookie management tests
npm run test:cookie

# Run tests in watch mode
npm run test:watch

# Run cookie tests with browser environment
npm run test:cookie:browser
```

### Test Categories

#### 1. Property Management Tests (6 tests)

```typescript
// Test cookie management enable/disable functionality
footer.cookieManagementEnabled = true;
expect(footer.getAttribute('cookie-management-enabled')).toBe('true');

// Test custom script URL handling
footer.customCookieScriptUrl = 'https://custom.com/script.js';
expect(footer.customCookieScriptUrl).toBe('https://custom.com/script.js');
```

#### 2. Script Loading Tests (5 tests)

```typescript
// Test default Osano script loading
footer.cookieManagementEnabled = true;
footer.connectedCallback();
expect(document.createElement).toHaveBeenCalledWith('script');
expect(mockScript.src).toBe('https://cmp.osano.com/16A0DbT9yDNIaQkvZ/...');

// Test error handling
mockScript.onerror();
expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('Failed to load'));
```

#### 3. Script Cleanup Tests (3 tests)

```typescript
// Test proper cleanup on component removal
footer.disconnectedCallback();
expect(mockDocumentHead.removeChild).toHaveBeenCalledWith(mockScript);
```

#### 4. Attribute Changes Tests (3 tests)

```typescript
// Test automatic script reloading when attributes change
footer.setAttribute('cookie-management-enabled', 'true');
expect(mockDocumentHead.appendChild).toHaveBeenCalledWith(mockScript);
```

#### 5. Component Registration Tests (2 tests)

```typescript
// Test Web Components registration
expect(customElements.define).toHaveBeenCalledWith('lfx-footer', LFXFooter);
```

### Test Coverage Report

```text
---------------------|---------|----------|---------|---------|
File                 | % Stmts | % Branch | % Funcs | % Lines |
---------------------|---------|----------|---------|---------|
footer.component.ts  |      98 |    95.23 |   93.33 |      98 |
footer.style.ts      |     100 |      100 |     100 |     100 |
---------------------|---------|----------|---------|---------|
```

### Testing Best Practices

**Web Components Testing Setup:**

- Custom HTMLElement mocking for JSDOM compatibility
- Attribute change simulation with automatic callback triggers
- Script element mocking for dynamic loading tests
- CustomEvent dispatching validation

**Error Scenario Testing:**

- Network failures during script loading
- Invalid script URLs
- Component cleanup edge cases
- Attribute changes when component not connected

### Continuous Integration

Tests run automatically on:

- **Pull Requests**: All tests must pass
- **Main Branch**: Full test suite with coverage reporting
- **Pre-commit**: Linting and type checking

**GitHub Actions Workflow:**

```yaml
- name: Run Tests
  run: |
    npm test
    npm run lint
    npm run type-check
```

### Manual Testing

For local development and manual verification:

```html
<!-- Test in browser -->
<!DOCTYPE html>
<html>
<head>
  <script src="dist/browser/footer.bundle.js"></script>
</head>
<body>
  <lfx-footer cookie-management-enabled="true"></lfx-footer>
  
  <script>
    // Test event handling
    const footer = document.querySelector('lfx-footer');
    footer.addEventListener('cookie-script-loaded', (e) => {
      console.log('Script loaded:', e.detail.scriptUrl);
    });
    footer.addEventListener('cookie-script-error', (e) => {
      console.error('Script error:', e.detail.error);
    });
  </script>
</body>
</html>
```

### Test Utilities

**Custom Matchers:**

```typescript
// Check if component has attribute
expect(footer.hasAttribute('cookie-management-enabled')).toBe(true);

// Verify script element properties
expect(mockScript).toMatchObject({
  src: expect.stringContaining('osano.com'),
  async: true,
  type: 'text/javascript'
});
```

**Mock Helpers:**

```typescript
// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
  mockScript.src = '';
  mockScript.onerror = null;
});
```

### Debugging Tests

**Common Issues:**

- **JSDOM Limitations**: Some browser APIs need custom mocking
- **Web Components**: Custom elements require HTMLElement mocking
- **Async Operations**: Use proper async/await or done callbacks

**Debug Commands:**

```bash
# Run specific test with verbose output
npm test -- --testNamePattern="should load default Osano script" --verbose

# Run tests with debugging
node --inspect-brk node_modules/.bin/jest --runInBand

# Generate detailed coverage report
npm run test:coverage -- --coverage --coverageReporters=text-lcov
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

1. Install dependencies:

```bash
npm ci
```

1. Build the tokens and components:

```bash
npm run build
```

### Making Changes

1. The source tokens are defined in `src/design/tokens/tokens.json`
2. Modify the tokens file according to your needs, or update it in Figma \
   using Tokens Studio
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

1. The GitHub Action will automatically:
   - Build the package
   - Update the version
   - Publish to npm

### Guidelines

- Follow semantic versioning for releases
- Update documentation when adding new token categories
- Add comments to explain complex token relationships
- Test tokens in a real application before releasing
