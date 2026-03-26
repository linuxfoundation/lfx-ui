// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './changelog.component';

/**
 * Local dev server URL for the changelog API.
 * Start the lfx-changelog backend (`yarn start` in the lfx-changelog repo)
 * before running Storybook to see live data.
 */
const LOCAL_BASE_URL = 'http://localhost:4204';

interface ChangelogCSSProps {
  product?: string;
  theme?: 'light' | 'dark';
  limit?: number;
  'base-url'?: string;
  '--lfx-changelog-font-family'?: string;
  '--lfx-changelog-text-primary'?: string;
  '--lfx-changelog-text-secondary'?: string;
  '--lfx-changelog-bg-surface'?: string;
  '--lfx-changelog-bg-surface-alt'?: string;
  '--lfx-changelog-border-color'?: string;
  '--lfx-changelog-accent'?: string;
  '--lfx-changelog-accent-bg'?: string;
  '--lfx-changelog-border-radius'?: string;
  '--lfx-changelog-card-padding'?: string;
  [key: string]: any;
}

const meta: Meta<ChangelogCSSProps> = {
  title: 'Components/Changelog',
  component: 'lfx-changelog',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
An embeddable changelog widget for LFX products. Fetches and displays published changelog entries with markdown rendering, light/dark theme support, and full style customization.

## Features
- **Product filtering**: Show changelogs for a specific LFX product via the \`product\` attribute
- **Light/Dark theme**: Toggle with the \`theme\` attribute
- **Markdown rendering**: Full GFM markdown support with XSS protection (DOMPurify)
- **Loading states**: Skeleton loading animation
- **Error handling**: Error display with retry button
- **CSS custom properties**: Override colors, fonts, spacing
- **\`::part()\` selectors**: Style internal elements from outside

## Usage
\`\`\`html
<lfx-changelog
  product="easycla"
  base-url="https://changelog.lfx.dev"
  theme="dark"
  limit="5"
></lfx-changelog>
\`\`\`

## Required Attributes
- \`product\` — Product slug to filter changelogs

## Available Product Slugs
\`changelog\`, \`community-data-platform\`, \`crowdfunding\`, \`easycla\`, \`individual-dashboard\`, \`insights\`, \`mentorship\`, \`organization-dashboard\`, \`project-control-center\`
        `,
      },
    },
  },
  argTypes: {
    product: {
      control: { type: 'select' },
      options: [
        'changelog',
        'community-data-platform',
        'crowdfunding',
        'easycla',
        'individual-dashboard',
        'insights',
        'mentorship',
        'organization-dashboard',
        'project-control-center',
      ],
      description: 'Product slug to filter changelogs (required)',
      table: { category: 'Attributes' },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Color theme',
      table: { category: 'Attributes' },
    },
    limit: {
      control: { type: 'number', min: 1, max: 25 },
      description: 'Maximum number of entries to show',
      table: { category: 'Attributes' },
    },
    'base-url': {
      control: 'text',
      description: 'Override the API base URL (defaults to prod)',
      table: { category: 'Attributes' },
    },
    '--lfx-changelog-font-family': {
      control: 'text',
      description: 'Font family',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-changelog-text-primary': {
      control: 'color',
      description: 'Primary text color',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-changelog-bg-surface': {
      control: 'color',
      description: 'Background color',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-changelog-accent': {
      control: 'color',
      description: 'Accent color',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-changelog-border-radius': {
      control: 'text',
      description: 'Card border radius',
      table: { category: 'CSS Custom Properties' },
    },
    '--lfx-changelog-card-padding': {
      control: 'text',
      description: 'Card padding',
      table: { category: 'CSS Custom Properties' },
    },
  },
  render: (args) => {
    const styles = Object.entries(args)
      .filter(([key, value]) => key.startsWith('--') && value)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    return html`
      <lfx-changelog
        style="${styles}"
        product="${args.product || ''}"
        theme="${args.theme || 'light'}"
        limit="${args.limit || 10}"
        base-url="${args['base-url'] || ''}"></lfx-changelog>
    `;
  },
};

export default meta;
type Story = StoryObj<ChangelogCSSProps>;

// Default — EasyCLA changelogs via local dev server
export const Default: Story = {
  args: {
    product: 'easycla',
    'base-url': LOCAL_BASE_URL,
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    product: 'easycla',
    'base-url': LOCAL_BASE_URL,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Limited entries
export const LimitedEntries: Story = {
  args: {
    product: 'insights',
    'base-url': LOCAL_BASE_URL,
    limit: 3,
  },
};

// Insights product
export const InsightsProduct: Story = {
  args: {
    product: 'insights',
    'base-url': LOCAL_BASE_URL,
  },
};

// Mentorship product
export const MentorshipProduct: Story = {
  args: {
    product: 'mentorship',
    'base-url': LOCAL_BASE_URL,
  },
};

// Dark theme with custom accent
export const CustomAccent: Story = {
  args: {
    product: 'easycla',
    'base-url': LOCAL_BASE_URL,
    theme: 'dark',
    '--lfx-changelog-accent': '#10b981',
    '--lfx-changelog-accent-bg': '#064e3b',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// CSS Parts example
export const WithCSSParts: Story = {
  render: () => html`
    <style>
      .parts-demo lfx-changelog::part(card) {
        border-left: 3px solid #3b82f6;
      }

      .parts-demo lfx-changelog::part(heading) {
        font-style: italic;
      }

      .parts-demo lfx-changelog::part(version) {
        background: #fef3c7;
        color: #92400e;
      }
    </style>
    <div class="parts-demo">
      <lfx-changelog product="easycla" base-url="${LOCAL_BASE_URL}" limit="3"></lfx-changelog>
    </div>
  `,
};

// Error state (invalid base URL)
export const ErrorState: Story = {
  args: {
    product: 'easycla',
    'base-url': 'https://invalid.example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the error state when the API is unreachable. Includes a retry button.',
      },
    },
  },
};

// Missing product (shows error)
export const MissingProduct: Story = {
  render: () => html` <lfx-changelog base-url="${LOCAL_BASE_URL}"></lfx-changelog> `,
  parameters: {
    docs: {
      description: {
        story: 'Shows the error state when the required `product` attribute is missing.',
      },
    },
  },
};
