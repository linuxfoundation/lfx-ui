// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tools.component';

import type { LFXTools } from './tools.component';
import type { MenuSection, MenuItem } from '../../core/icons/icon-service';

const meta: Meta<LFXTools> = {
  title: 'Components/Tools',
  component: 'lfx-tools',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The LFX Tools component is a dropdown menu triggered by a grid icon button. It provides navigation to various LFX platform tools and services.

## Features
- Grid icon button trigger matching LFX design
- Organized dropdown menu with sections
- Support for custom menu items
- Keyboard navigation
- Responsive design
- Accessible with ARIA attributes
- Smooth animations
- Click-outside-to-close functionality
- CSS custom properties for theming
- CSS parts for styling control

## Usage
\`\`\`html
<lfx-tools></lfx-tools>
\`\`\`

## Customization
The component can be styled using CSS custom properties:
- \`--lfx-tools-button-size\`: Size of the trigger button
- \`--lfx-tools-button-bg\`: Button background color
- \`--lfx-tools-menu-width\`: Width of the dropdown menu
- And many more...

Use CSS parts for fine-grained styling:
- \`::part(button)\`: The menu trigger button
- \`::part(menu)\`: The dropdown menu container
- \`::part(menu-item)\`: Individual menu items
        `,
      },
    },
  },
  argTypes: {
    // We'll control the appearance through CSS custom properties
  },
  args: {},
};

export default meta;
type Story = StoryObj<LFXTools>;

// Default story
export const Default: Story = {
  render: () => html`<lfx-tools kit="e6811dc2da"></lfx-tools>`,
  parameters: {
    docs: {
      description: {
        story: 'The default LFX Tools component with all standard menu items.',
      },
    },
  },
};

// Custom menu items
const customMenuItems: MenuSection[] = [
  {
    section: 'Development',
    items: [
      { label: 'GitHub', url: 'https://github.com', icon: 'fa-brands fa-github', target: '_blank' },
      { label: 'Documentation', url: '/docs', icon: 'fa-solid fa-book', target: '_self' },
      { label: 'API Reference', url: '/api', icon: 'fa-solid fa-code', target: '_self' },
    ],
  },
  {
    section: 'Support',
    items: [
      { label: 'Help Center', url: '/help', icon: 'fa-solid fa-question-circle', target: '_self' },
      { label: 'Contact Support', url: '/contact', icon: 'fa-solid fa-envelope', target: '_self' },
    ],
  },
];

export const CustomMenuItems: Story = {
  render: () => {
    const updateItems = (el: LFXTools) => {
      el.menuData = customMenuItems;
    };

    return html` <lfx-tools kit="e6811dc2da" ${(el: LFXTools) => updateItems(el)}></lfx-tools> `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tools component with custom menu items. You can override the default menu structure by setting the `menuData` property.',
      },
    },
  },
};

// Multiple instances
export const MultipleInstances: Story = {
  render: () => {
    const menuData1: MenuSection[] = [
      {
        section: 'Analytics',
        items: [
          { label: 'Dashboard', url: '/dashboard', icon: 'fa-solid fa-chart-bar', target: '_self' },
          { label: 'Reports', url: '/reports', icon: 'fa-solid fa-chart-line', target: '_self' },
        ],
      },
    ];

    const menuData2: MenuSection[] = [
      {
        section: 'Admin',
        items: [
          { label: 'Users', url: '/users', icon: 'fa-solid fa-users', target: '_self' },
          { label: 'Settings', url: '/settings', icon: 'fa-solid fa-cog', target: '_self' },
        ],
      },
    ];

    return html`
      <div style="display: flex; gap: 20px; align-items: center;">
        <div>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Analytics Tools</p>
          <lfx-tools .menuData=${menuData1}></lfx-tools>
        </div>
        <div>
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Admin Tools</p>
          <lfx-tools .menuData=${menuData2}></lfx-tools>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple tools components with different menu configurations.',
      },
    },
  },
};

// CSS Parts styling example
export const CSSPartsExample: Story = {
  render: () => html`
    <style>
      .custom-tools::part(button) {
        border: 2px solid #10b981;
        background: linear-gradient(135deg, #ecfdf5, #d1fae5);
      }

      .custom-tools::part(button):hover {
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
        transform: scale(1.05);
      }

      .custom-tools::part(icon) {
        color: #059669;
      }

      .custom-tools::part(menu) {
        border: 2px solid #10b981;
        background: linear-gradient(180deg, #ffffff, #f0fdf4);
      }

      .custom-tools::part(menu-item):hover {
        background: linear-gradient(90deg, #ecfdf5, #d1fae5);
      }
    </style>

    <lfx-tools class="custom-tools"></lfx-tools>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of styling the component using CSS parts for fine-grained control.',
      },
    },
  },
};

// Custom Font Awesome kit example
export const WithCustomKit: Story = {
  render: () => html`
    <div>
      <p style="margin-bottom: 15px; font-size: 14px; color: #666;">Using custom Font Awesome kit via attribute</p>
      <lfx-tools kit="49d4d32e47"></lfx-tools>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Tools component loading a custom Font Awesome Pro kit. Only provide a kit ID if Font Awesome is not already loaded by your application.',
      },
    },
  },
};

// Event handling example
export const WithEventHandling: Story = {
  render: () => {
    const handleMenuOpened = (e: CustomEvent) => {
      console.log('Menu opened:', e.detail);
    };

    const handleMenuClosed = (e: CustomEvent) => {
      console.log('Menu closed:', e.detail);
    };

    return html`
      <div>
        <p style="margin-bottom: 15px; font-size: 14px; color: #666;">Open browser console to see events</p>
        <lfx-tools @menu-opened=${handleMenuOpened} @menu-closed=${handleMenuClosed}></lfx-tools>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Tools component with event listeners for menu open/close events.',
      },
    },
  },
};

// Product attribute examples
export const WithProductSelected: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: flex-start;">
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Drive (Active)</p>
        <lfx-tools product="drive" kit="e6811dc2da"></lfx-tools>
      </div>
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">EasyCLA (Active)</p>
        <lfx-tools product="easycla" kit="e6811dc2da"></lfx-tools>
      </div>
      <div>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Insights (Active)</p>
        <lfx-tools product="insights" kit="e6811dc2da"></lfx-tools>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Tools components with different products selected. The `product` attribute sets the corresponding menu item as active, giving it the same styling as hover/focus states. Available product values: `crowdfunding`, `drive`, `individual-dashboard`, `insights`, `mentorship`, `organization-dashboard`, `community-data`, `easycla`, `project-control-center`, `security`.',
      },
    },
  },
};
