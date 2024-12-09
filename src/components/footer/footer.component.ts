// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { style } from './footer.style';

/**
 * @element lfx-footer
 * @summary A footer component for LFX applications
 * @description This component provides a consistent footer across LFX applications
 * @csspart footer-container - The main container of the footer
 * @csspart footer-content - The content wrapper of the footer
 * @csspart footer-links - The container for footer links
 * @csspart copyright-container - The container for copyright information
 *
 * @cssproperty --lfx-footer-bg - Background color of the footer
 * @cssproperty --lfx-footer-text - Text color of the footer
 */
@customElement('lfx-footer')
export class LFXFooter extends LitElement {
  static styles = style;

  render() {
    return html`
      <div class="footer-container">
        <div class="footer-content">
          <div class="copyright-container">
            <p class="copyright">
              Copyright &copy; ${new Date().getFullYear()} The Linux Foundation&reg;. All rights reserved. The Linux Foundation has registered trademarks and
              uses trademarks. For more information, including terms of use,
              <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank" rel="noopener noreferrer">Platform Usage</a>,
              <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, and
              <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en" target="_blank" rel="noopener noreferrer">Trademark Usage</a>, please
              see our <a href="https://www.linuxfoundation.org/legal/policies" target="_blank" rel="noopener noreferrer">Policies</a> page.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
