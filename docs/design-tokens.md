## Usage

After installing the package, you can import and use the tokens in your application:

The tokens are strongly typed, providing autocomplete support and type safety in your IDE.

## Angular Implementation

```typescript
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { definePreset } from 'primeng/themes';
import { Aura } from 'primeng/themes/aura';
import { lfxPreset } from '@linuxfoundation/lfx-ui-core';

const customPreset = definePreset(Aura, {
  primitive: lfxPreset.primitive
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({
      preset: customPreset,
      options: {
        prefix: 'p',
        darkModeSelector: '.dark-mode'
      }
    });
  }
}
```

### Vue Implementation

```typescript
import { definePreset } from 'primeng/themes';
import { Aura } from 'primeng/themes/aura';
import { lfxPreset } from '@linuxfoundation/lfx-ui-core';

const MyPreset = definePreset(Aura, {
  primitive: lfxPreset.primitive
});

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset
  }
});
```
