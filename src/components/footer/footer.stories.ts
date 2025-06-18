// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './footer.component';

const meta: Meta = {
  title: 'Components/Footer',
  component: 'lfx-footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The LFX Footer component provides a consistent footer across all LFX applications with integrated cookie consent management powered by Osano.

## Features
- Responsive design with Linux Foundation branding
- Optional cookie consent management integration  
- Configurable script URLs for different environments
- Event-driven architecture for script loading feedback
- Automatic cleanup when component is removed

## Cookie Management
When cookie management is enabled, the component automatically loads and manages the Osano cookie consent script. This ensures compliance with privacy regulations like GDPR and CCPA across all supported domains.
        `,
      },
    },
  },
  argTypes: {
    'cookie-management-enabled': {
      control: 'boolean',
      description: 'Enable/disable cookie management functionality',
      defaultValue: false,
    },
    'custom-cookie-script-url': {
      control: 'text',
      description: 'Custom cookie script URL (optional, defaults to Osano)',
      defaultValue: '',
    },
  },
  render: (args) => html`
    <lfx-footer ?cookie-management-enabled=${args['cookie-management-enabled']} custom-cookie-script-url=${args['custom-cookie-script-url'] || ''}></lfx-footer>
  `,
};

export default meta;
type Story = StoryObj;

/**
 * Default footer without cookie management enabled.
 * This is the basic implementation showing just the copyright information.
 */
export const Default: Story = {
  args: {
    'cookie-management-enabled': false,
    'custom-cookie-script-url': '',
  },
};

/**
 * Footer with cookie management enabled using the default Osano script.
 * This configuration will load the production Osano cookie consent script
 * that supports all LFX domains (lfx.dev, lfx.linuxfoundation.org, etc.).
 */
export const WithCookieManagement: Story = {
  args: {
    'cookie-management-enabled': true,
    'custom-cookie-script-url': '',
  },
  parameters: {
    docs: {
      description: {
        story: `
When cookie management is enabled, the footer component will automatically load the Osano cookie consent script. 
This provides comprehensive cookie management functionality including:

- GDPR and CCPA compliance
- User consent preferences
- Cookie categorization
- Privacy policy integration

**Note:** In Storybook, the actual script loading is demonstrated but may not show the full UI due to domain restrictions.
        `,
      },
    },
  },
};

/**
 * Footer with a custom cookie script URL.
 * This example shows how to configure the component to load a custom cookie management script
 * instead of the default Osano script. Useful for testing or alternative implementations.
 */
export const WithCustomScript: Story = {
  args: {
    'cookie-management-enabled': true,
    'custom-cookie-script-url': 'https://example.com/custom-cookie-script.js',
  },
  parameters: {
    docs: {
      description: {
        story: `
You can provide a custom cookie script URL to override the default Osano implementation. 
This is useful for:

- Testing with development/staging cookie scripts
- Using alternative cookie management providers
- Environment-specific configurations

**Important:** Ensure your custom script URL is HTTPS and properly configured for your domain.
        `,
      },
    },
  },
};

/**
 * Footer showing event handling for cookie script loading.
 * This story demonstrates how to listen for the cookie-script-loaded and cookie-script-error events.
 */
export const WithEventHandling: Story = {
  args: {
    'cookie-management-enabled': true,
    'custom-cookie-script-url': '',
  },
  render: (args) => html`
    <div>
      <div
        id="event-log"
        style="margin-bottom: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 12px; min-height: 60px;">
        <strong>Event Log:</strong><br />
        <span id="log-content">Waiting for cookie script events...</span>
      </div>
      <lfx-footer
        ?cookie-management-enabled=${args['cookie-management-enabled']}
        custom-cookie-script-url=${args['custom-cookie-script-url'] || ''}
        @cookie-script-loaded=${(e: CustomEvent) => {
          const log = document.getElementById('log-content');
          if (log) {
            log.innerHTML = `✅ Cookie script loaded from: ${e.detail.scriptUrl}<br>Timestamp: ${new Date().toLocaleTimeString()}`;
          }
        }}
        @cookie-script-error=${(e: CustomEvent) => {
          const log = document.getElementById('log-content');
          if (log) {
            log.innerHTML = `❌ Cookie script failed to load: ${e.detail.error}<br>URL: ${e.detail.scriptUrl}<br>Timestamp: ${new Date().toLocaleTimeString()}`;
          }
        }}></lfx-footer>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
The footer component dispatches custom events when cookie scripts are loaded or fail to load:

- **cookie-script-loaded**: Fired when the script loads successfully
- **cookie-script-error**: Fired when the script fails to load

These events can be used to implement custom error handling or tracking in your application.
        `,
      },
    },
  },
};
