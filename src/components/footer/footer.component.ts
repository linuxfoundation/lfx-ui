// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

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
export class LFXFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  private getTemplate(): string {
    return `
      <style>${style}</style>

      <div class="footer-container">
        <div class="footer-content">
          <div class="copyright-container">
            <p class="copyright">Copyright &copy; ${new Date().getFullYear()} The Linux Foundation&reg;. All rights reserved.
            The Linux Foundation has registered trademarks and uses trademarks. For more information, including terms of use,
            <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank">Platform Usage</a>,
            <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en" target="_blank">Privacy Policy</a>,
            and <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en" target="_blank">Trademark Usage</a>,
            please see our <a href="https://www.linuxfoundation.org/legal/policies" target="_blank">Policies</a> page.</p>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = this.getTemplate();
    }
  }
}

// Use IIFE to register the component immediately
(() => {
  if (typeof window !== 'undefined') {
    if (!customElements.get('lfx-footer')) {
      customElements.define('lfx-footer', LFXFooter);
    }
  }
})();
