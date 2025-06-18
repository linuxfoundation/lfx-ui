// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface ComponentInfo {
  name: string;
  path: string;
  exportPath: string;
}

/**
 * Extract component information from the components index file
 */
function extractComponents(): ComponentInfo[] {
  const indexPath = join(__dirname, '../components/index.ts');
  const content = readFileSync(indexPath, 'utf-8');

  const components: ComponentInfo[] = [];
  const exportRegex = /export \* from '\.\/([^']+)\/([^']+)'/g;

  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const [, folder, file] = match;
    const componentName = folder.replace(/-(.)/g, (_, letter: string) => letter.toUpperCase()); // Convert kebab-case to camelCase
    components.push({
      name: componentName,
      path: join(__dirname, '../components', folder, `${file}.ts`),
      exportPath: `./${folder}/${file}`,
    });
  }

  return components;
}

/**
 * Build a single component for browser
 */
function buildComponent(component: ComponentInfo): void {
  const outputDir = join(__dirname, '../../dist/browser');
  const outputFile = join(outputDir, `${component.name}.bundle.js`);

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Building ${component.name} component...`);

  try {
    const command = `browserify ${component.path} -p [ tsify ] -o ${outputFile}`;
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Built ${component.name} component`);
  } catch (error) {
    console.error(`❌ Failed to build ${component.name} component:`, error);
    throw error;
  }
}

/**
 * Main build function
 */
function buildBrowser(): void {
  console.log('🚀 Starting browser build...');

  try {
    const components = extractComponents();
    console.log(`📦 Found ${components.length} components to build:`, components.map((c) => c.name).join(', '));

    for (const component of components) {
      buildComponent(component);
    }

    console.log('✅ Browser build completed successfully!');
  } catch (error) {
    console.error('❌ Browser build failed:', error);
    process.exit(1);
  }
}

// Run the build if this script is executed directly
if (require.main === module) {
  buildBrowser();
}

export { buildBrowser, extractComponents };
