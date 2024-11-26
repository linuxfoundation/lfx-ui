// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './footer.component';

const meta: Meta = {
  title: 'Components/Footer',
  component: 'lfx-footer',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => html`<lfx-footer></lfx-footer>`
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
