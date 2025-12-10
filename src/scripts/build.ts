// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import fs from 'fs';
import path from 'path';

interface TokenValue {
  value: any;
  type: string;
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup;
}

// Required token sections that must exist in tokens.json
const REQUIRED_SECTIONS = ['aura/primitive', 'aura/semantic', 'aura/component'] as const;
const OPTIONAL_SECTIONS = ['aura/component/light', 'aura/component/dark'] as const;

function isTokenGroup(value: unknown): value is TokenGroup {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateTokenStructure(tokens: unknown): asserts tokens is TokenGroup {
  if (!isTokenGroup(tokens)) {
    throw new Error('tokens.json must contain a valid JSON object');
  }

  // Validate required sections exist and are valid objects
  for (const section of REQUIRED_SECTIONS) {
    if (!(section in tokens)) {
      throw new Error(`Missing required section: "${section}" in tokens.json`);
    }
    if (!isTokenGroup(tokens[section])) {
      throw new Error(`Section "${section}" must be a valid object, got ${typeof tokens[section]}`);
    }
  }

  // Validate optional sections if they exist
  for (const section of OPTIONAL_SECTIONS) {
    if (section in tokens && !isTokenGroup(tokens[section])) {
      throw new Error(`Section "${section}" must be a valid object if present, got ${typeof tokens[section]}`);
    }
  }
}

function generateTokenImports(): string {
  return `import { Token } from './types';\n\n`;
}

function formatValue(value: any): string {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
}

function generateTokenObject(tokens: TokenGroup, level: string = ''): string {
  let output = '{\n';

  for (const [key, value] of Object.entries(tokens)) {
    if (value.hasOwnProperty('value') && value.hasOwnProperty('type')) {
      const tokenValue = value as TokenValue;
      output += `  ${level}'${key}': { value: ${formatValue(tokenValue.value)}, type: '${tokenValue.type}' },\n`;
    } else {
      output += `  ${level}'${key}': ${generateTokenObject(value as TokenGroup, level + '  ')},\n`;
    }
  }

  output += `${level}}`;
  return output;
}

function generatePrimitiveTokens(tokens: TokenGroup): string {
  const primitiveTokens = tokens['aura/primitive'];
  return `${generateTokenImports()}
export const primitiveTokens = ${generateTokenObject(primitiveTokens as TokenGroup)} as const;

export type PrimitiveTokens = typeof primitiveTokens;`;
}

function generateSemanticTokens(tokens: TokenGroup): string {
  const semanticTokens = tokens['aura/semantic'];
  return `${generateTokenImports()}
import { primitiveTokens } from './primitive.tokens';

export const semanticTokens = ${generateTokenObject(semanticTokens as TokenGroup)} as const;

export type SemanticTokens = typeof semanticTokens;`;
}

function deepMerge(target: TokenGroup, source: TokenGroup): TokenGroup {
  const result = { ...target };

  for (const key of Object.keys(source)) {
    const sourceValue = source[key];
    const targetValue = result[key];

    // If both are token groups (objects without value/type), merge recursively
    if (isTokenGroup(sourceValue) && isTokenGroup(targetValue) && !('value' in sourceValue) && !('value' in targetValue)) {
      result[key] = deepMerge(targetValue as TokenGroup, sourceValue as TokenGroup);
    } else {
      // Otherwise, source overwrites target
      result[key] = sourceValue;
    }
  }

  return result;
}

function mergeColorSchemeTokens(tokens: TokenGroup): TokenGroup {
  const baseTokens = tokens['aura/component'];
  const lightTokens = tokens['aura/component/light'];
  const darkTokens = tokens['aura/component/dark'];

  // Validation already ensures baseTokens exists and is valid
  if (!isTokenGroup(baseTokens)) {
    throw new Error('aura/component section is invalid or missing');
  }

  // Get all unique component names from all three sources
  const allComponentNames = new Set([
    ...Object.keys(baseTokens),
    ...(isTokenGroup(lightTokens) ? Object.keys(lightTokens) : []),
    ...(isTokenGroup(darkTokens) ? Object.keys(darkTokens) : []),
  ]);

  const mergedTokens: TokenGroup = {};

  for (const componentName of allComponentNames) {
    const baseComponent = baseTokens[componentName];
    const lightComponent = isTokenGroup(lightTokens) ? lightTokens[componentName] : undefined;
    const darkComponent = isTokenGroup(darkTokens) ? darkTokens[componentName] : undefined;

    // Start with base tokens (or empty object if component only exists in colorScheme)
    mergedTokens[componentName] = isTokenGroup(baseComponent) ? { ...baseComponent } : {};

    // Build colorScheme from light/dark tokens
    if (lightComponent || darkComponent) {
      if (!isTokenGroup(lightComponent) && lightComponent !== undefined) {
        console.warn(`Warning: ${componentName} in aura/component/light is not a valid token group`);
      }
      if (!isTokenGroup(darkComponent) && darkComponent !== undefined) {
        console.warn(`Warning: ${componentName} in aura/component/dark is not a valid token group`);
      }

      const newColorScheme: TokenGroup = {
        ...(isTokenGroup(lightComponent) ? { light: lightComponent } : {}),
        ...(isTokenGroup(darkComponent) ? { dark: darkComponent } : {}),
      };

      // Deep merge with existing colorScheme if present (preserves base colorScheme properties)
      const existingColorScheme = (mergedTokens[componentName] as TokenGroup)['colorScheme'];
      if (isTokenGroup(existingColorScheme)) {
        (mergedTokens[componentName] as TokenGroup)['colorScheme'] = deepMerge(existingColorScheme as TokenGroup, newColorScheme);
      } else {
        (mergedTokens[componentName] as TokenGroup)['colorScheme'] = newColorScheme;
      }
    }
  }

  return mergedTokens;
}

function generateComponentTokens(tokens: TokenGroup): string {
  const mergedTokens = mergeColorSchemeTokens(tokens);
  return `${generateTokenImports()}
import { semanticTokens } from './semantic.tokens';

export const componentTokens = ${generateTokenObject(mergedTokens)} as const;

export type ComponentTokens = typeof componentTokens;`;
}

function generateLFXPreset(): string {
  return `import { componentTokens } from '../tokens/component.tokens';
import { primitiveTokens } from '../tokens/primitive.tokens';
import { semanticTokens } from '../tokens/semantic.tokens';
import { lfxComponentTokens } from '../tokens/lfx.component.tokens';
export const lfxPreset = {
  component: { ...componentTokens, ...lfxComponentTokens },
  primitive: primitiveTokens,
  semantic: semanticTokens,
} as const;

export type LFXPreset = typeof lfxPreset;`;
}

function generatePresetsIndex(): string {
  return `export * from './lfx.preset';`;
}

function generateIndex(): string {
  return `export * from './design/presets';
export * from './components';`;
}

async function buildTokens() {
  try {
    console.log('🔧 Building design tokens...');

    // Read tokens.json
    const tokensPath = path.resolve(__dirname, '../design/tokens/tokens.json');
    if (!fs.existsSync(tokensPath)) {
      throw new Error(`tokens.json not found at ${tokensPath}`);
    }

    let tokens: unknown;
    try {
      tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    } catch (parseError) {
      throw new Error(`Failed to parse tokens.json: ${parseError instanceof Error ? parseError.message : 'Invalid JSON'}`);
    }

    // Validate token structure before processing
    validateTokenStructure(tokens);

    // Generate token files
    const outputDir = path.resolve(__dirname, '../design/tokens');
    const presetsDir = path.resolve(__dirname, '../design/presets');
    const mainDir = path.resolve(__dirname, '../');

    // Ensure presets directory exists
    if (!fs.existsSync(presetsDir)) {
      fs.mkdirSync(presetsDir, { recursive: true });
    }

    // Write token files
    fs.writeFileSync(path.join(outputDir, 'primitive.tokens.ts'), generatePrimitiveTokens(tokens));
    fs.writeFileSync(path.join(outputDir, 'semantic.tokens.ts'), generateSemanticTokens(tokens));
    fs.writeFileSync(path.join(outputDir, 'component.tokens.ts'), generateComponentTokens(tokens));

    // Write preset files
    fs.writeFileSync(path.join(presetsDir, 'lfx.preset.ts'), generateLFXPreset());
    fs.writeFileSync(path.join(presetsDir, 'index.ts'), generatePresetsIndex());

    // Write index file
    fs.writeFileSync(path.join(mainDir, 'index.ts'), generateIndex());

    console.log('✅ Token and preset files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating files:', error);
    process.exit(1);
  }
}

// Run the build if this script is executed directly
if (require.main === module) {
  buildTokens();
}

export { buildTokens };
