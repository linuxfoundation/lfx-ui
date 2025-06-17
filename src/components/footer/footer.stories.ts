// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './footer.component';

// Type for CSS custom properties
interface FooterCSSProps {
  '--lfx-footer-bg'?: string;
  '--lfx-footer-text'?: string;
  '--lfx-footer-link-color'?: string;
  '--lfx-footer-link-hover-color'?: string;
  '--lfx-footer-padding'?: string;
  '--lfx-footer-font-size'?: string;
  '--lfx-footer-text-align'?: string;
  [key: string]: any;
}

const meta: Meta<FooterCSSProps> = {
  title: 'Components/Footer',
  component: 'lfx-footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A footer component that displays consistent copyright and legal information across LFX applications.

## Styling
The footer can be styled using CSS custom properties for maximum flexibility:

- \`--lfx-footer-bg\` - Background color
- \`--lfx-footer-text\` - Text color
- \`--lfx-footer-link-color\` - Link color
- \`--lfx-footer-link-hover-color\` - Link hover color
- \`--lfx-footer-padding\` - Padding around footer
- \`--lfx-footer-font-size\` - Font size
- \`--lfx-footer-font-family\` - Font family
- \`--lfx-footer-text-align\` - Text alignment
- \`--lfx-footer-max-width\` - Maximum width

Plus many more for advanced customization including responsive and accessibility variations.
        `,
      },
    },
  },
  argTypes: {
    '--lfx-footer-bg': {
      control: 'color',
      description: 'Background color of the footer',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-text': {
      control: 'color',
      description: 'Text color of the footer',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-link-color': {
      control: 'color',
      description: 'Color of footer links',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-link-hover-color': {
      control: 'color',
      description: 'Color of footer links on hover',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-padding': {
      control: 'text',
      description: 'Padding around the footer',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-font-size': {
      control: 'text',
      description: 'Font size of footer text',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-footer-text-align': {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      table: { category: 'CSS Custom Properties' },
    },
  },
  render: (args) => {
    const styles = Object.entries(args)
      .filter(([key, value]) => key.startsWith('--') && value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    return html`
      <div>
        <lfx-footer style="${styles}"></lfx-footer>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj<FooterCSSProps>;

// Default story
export const Default: Story = {
  args: {},
};

// Light theme
export const LightTheme: Story = {
  args: {
    '--lfx-footer-bg': '#f8f9fa',
    '--lfx-footer-padding': '2rem',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    '--lfx-footer-bg': '#2d3748',
    '--lfx-footer-text': '#e2e8f0',
    '--lfx-footer-link-color': '#3B82F6',
    '--lfx-footer-link-hover-color': '#2563eb',
    '--lfx-footer-padding': '2rem',
  },
};

// High contrast theme
export const HighContrast: Story = {
  args: {
    '--lfx-footer-bg': '#000000',
    '--lfx-footer-text': '#ffffff',
    '--lfx-footer-link-color': '#ffff00',
    '--lfx-footer-link-hover-color': '#ffff80',
    '--lfx-footer-padding': '2rem',
    '--lfx-footer-font-size': '1rem',
  },
};

// Minimal styling
export const Minimal: Story = {
  args: {
    '--lfx-footer-bg': 'transparent',
    '--lfx-footer-padding': '2rem',
    '--lfx-footer-font-size': '0.7rem',
  },
};

// Large text for accessibility
export const LargeText: Story = {
  args: {
    '--lfx-footer-bg': '#f7fafc',
    '--lfx-footer-font-size': '1.125rem',
    '--lfx-footer-padding': '3rem 2rem',
  },
};

// Left aligned
export const LeftAligned: Story = {
  args: {
    '--lfx-footer-bg': '#edf2f7',
    '--lfx-footer-text-align': 'left',
    '--lfx-footer-padding': '2rem',
  },
};

// Compact version
export const Compact: Story = {
  args: {
    '--lfx-footer-bg': '#f1f5f9',
    '--lfx-footer-padding': '1rem',
    '--lfx-footer-font-size': '0.625rem',
  },
};

// Design tokens integration example
export const WithDesignTokens: Story = {
  render: () => html`
    <style>
      .tokens-example {
        /* Example design tokens that could be defined globally */
        --color-background-secondary: #f7fafc;
        --color-text-secondary: #718096;
        --color-primary: #3182ce;
        --color-primary-hover: #2c5282;
        --spacing-lg: 2rem;
        --spacing-md: 1rem;
        --font-size-sm: 0.875rem;
        --border-radius-md: 0.5rem;
      }

      .tokens-example lfx-footer {
        --lfx-footer-bg: var(--color-background-secondary);
        --lfx-footer-text: var(--color-text-secondary);
        --lfx-footer-link-color: var(--color-primary);
        --lfx-footer-link-hover-color: var(--color-primary-hover);
        --lfx-footer-padding: var(--spacing-lg) var(--spacing-md);
        --lfx-footer-font-size: var(--font-size-sm);
      }
    </style>
    <div class="tokens-example">
      <lfx-footer></lfx-footer>
    </div>
  `,
};

// CSS Parts styling example
export const WithCSSParts: Story = {
  render: () => html`
    <style>
      .parts-example lfx-footer::part(footer) {
        border-top: 3px solid #e53e3e;
        border-radius: 8px 8px 0 0;
      }

      .parts-example lfx-footer::part(copyright) {
        font-weight: 600;
        letter-spacing: 0.025em;
      }

      .parts-example lfx-footer::part(link) {
        font-weight: bold;
        border-bottom: 1px dotted currentColor;
        transition: all 0.2s ease;
      }
    </style>
    <div class="parts-example">
      <lfx-footer
        style="
        --lfx-footer-bg: #f7fafc;
        --lfx-footer-text: #2d3748;
        --lfx-footer-link-color: #e53e3e;
        --lfx-footer-link-hover-color: #c53030;
        --lfx-footer-padding: 2rem;
      "></lfx-footer>
    </div>
  `,
};

// Advanced CSS Parts - Professional Style
export const CSSPartsAdvanced: Story = {
  render: () => html`
    <style>
      .advanced-parts lfx-footer::part(footer) {
        border-top: 1px solid #e2e8f0;
        position: relative;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
      }

      .advanced-parts lfx-footer::part(footer)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: #ffd700;
        border-radius: 0 0 3px 3px;
      }

      .advanced-parts lfx-footer::part(footer-content) {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        margin: 1rem;
      }

      .advanced-parts lfx-footer::part(copyright) {
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .advanced-parts lfx-footer::part(link) {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        text-decoration: none;
        margin: 0 0.25rem;
        display: inline-block;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .advanced-parts lfx-footer::part(link):hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
      }
    </style>
    <div class="advanced-parts">
      <lfx-footer
        style="
        --lfx-footer-text: white;
        --lfx-footer-link-color: #ffd700;
        --lfx-footer-link-hover-color: #ffed4e;
        --lfx-footer-padding: 2rem;
      "></lfx-footer>
    </div>
  `,
};

// Mobile optimized
export const MobileOptimized: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    '--lfx-footer-bg': '#f8fafc',
    '--lfx-footer-text': '#64748b',
    '--lfx-footer-padding': '1.5rem 1rem',
    '--lfx-footer-font-size': '0.75rem',
  },
};
