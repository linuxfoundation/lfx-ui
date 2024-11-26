import fs from 'fs';
import path from 'path';

interface TokenValue {
  value: any;
  type: string;
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup;
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

function generateComponentTokens(tokens: TokenGroup): string {
  const componentTokens = tokens['aura/component'];
  return `${generateTokenImports()}
import { semanticTokens } from './semantic.tokens';

export const componentTokens = ${generateTokenObject(componentTokens as TokenGroup)} as const;

export type ComponentTokens = typeof componentTokens;`;
}

function generateLFXPreset(): string {
  return `import { componentTokens } from '../tokens/component.tokens';
import { primitiveTokens } from '../tokens/primitive.tokens';
import { semanticTokens } from '../tokens/semantic.tokens';

export const lfxPreset = {
  component: componentTokens,
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
export * from './core/prettier-config';
export * from './components';`;
}

async function buildTokens() {
  try {
    // Read tokens.json
    const tokensPath = path.resolve(__dirname, '../design/tokens/tokens.json');
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

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

    console.log('Token and preset files generated successfully!');
  } catch (error) {
    console.error('Error generating files:', error);
    process.exit(1);
  }
}

buildTokens();
