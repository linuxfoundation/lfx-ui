import browserify from 'browserify';
import fs from 'fs';
import path from 'path';

const components = ['footer/footer.component.ts'];

components.forEach((component) => {
  const componentName = path.basename(component, '.ts');
  const bundlePath = `dist/browser/${componentName}.bundle.js`;

  browserify(`src/components/${component}`)
    .plugin('tsify')
    .bundle()
    .pipe(fs.createWriteStream(bundlePath))
    .on('finish', () => {
      console.log(`Built ${bundlePath}`);
    });
});
