// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { StylesheetManager } from '../../core/styles/stylesheet-utils';
import { style } from './footer.style';

/**
 * @element lfx-footer
 * @summary A footer component for LFX applications
 * @description This component provides a consistent footer across LFX applications with optional cookie consent script integration
 * @csspart footer - The main footer element
 * @csspart footer-container - The main container of the footer
 * @csspart footer-content - The content wrapper of the footer
 * @csspart copyright - The copyright paragraph
 * @csspart link - Individual footer links
 *
 * @cssproperty --lfx-footer-bg - Background color of the footer
 * @cssproperty --lfx-footer-text - Text color of the footer
 * @cssproperty --lfx-footer-link-color - Color of footer links
 * @cssproperty --lfx-footer-link-hover-color - Color of footer links on hover
 * @cssproperty --lfx-footer-padding - Padding of the footer
 * @cssproperty --lfx-footer-font-size - Font size of footer text
 * @cssproperty --lfx-footer-font-family - Font family of footer text
 *
 * @attr {boolean} cookie-tracking - When true, appends the Osano cookie consent script to the document
 *
 * @fires cookie-script-error - Fired when the cookie consent script fails to load
 */
export class LFXFooter extends HTMLElement {
  private _template!: HTMLTemplateElement;
  private _rendered = false;
  private static readonly OSANO_SCRIPT_SRC = 'https://cmp.osano.com/16A0DbT9yDNIaQkvZ/d6ac078e-c71f-4b96-8c97-818cc1cc6632/osano.js?variant=two';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._createTemplate();
  }

  static get observedAttributes(): string[] {
    return ['cookie-tracking'];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (name === 'cookie-tracking' && this._rendered) {
      this._handleCookieTracking();
    }
  }

  private _createTemplate(): void {
    this._template = document.createElement('template');
    this._template.innerHTML = `
      <footer class="footer-container" part="footer" role="contentinfo">
        <div class="footer-content" part="footer-content">
          <div class="copyright-container" part="copyright-container">
            <p class="copyright" part="copyright">
              Copyright © ${new Date().getFullYear()} The Linux Foundation®. All rights reserved.
              The Linux Foundation has registered trademarks and uses trademarks. For more information, including terms of use,
              <a href="https://www.linuxfoundation.org/legal/platform-use-agreement/" target="_blank" rel="noopener noreferrer" part="link">Platform Usage</a>,
              <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en" target="_blank" rel="noopener noreferrer" part="link">Privacy Policy</a>,
              and <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en" target="_blank" rel="noopener noreferrer" part="link">Trademark Usage</a>,
              please see our <a href="https://www.linuxfoundation.org/legal/policies" target="_blank" rel="noopener noreferrer" part="link">Policies</a> page.
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  connectedCallback(): void {
    if (!this._rendered) {
      // Apply styles using utility (with caching)
      StylesheetManager.applyStyles(this.shadowRoot!, style, 'lfx-footer');

      // Add template content
      const content = this._template.content.cloneNode(true);
      this.shadowRoot!.appendChild(content);
      this._rendered = true;
    }

    // Check if cookie tracking should be enabled
    this._handleCookieTracking();
  }

  private _handleCookieTracking(): void {
    const cookieTrackingAttr = this.getAttribute('cookie-tracking');
    const shouldEnable = cookieTrackingAttr === 'true' || cookieTrackingAttr === '';

    if (shouldEnable) {
      this._appendOsanoScript();
    }
  }

  private _appendOsanoScript(): void {
    if (typeof document === 'undefined') {
      return;
    }

    // Check if the script already exists to prevent duplicates
    const existingScript = document.querySelector(`script[src="${LFXFooter.OSANO_SCRIPT_SRC}"]`);
    if (existingScript) {
      return;
    }

    // Create and append the script
    const script = document.createElement('script');
    script.src = LFXFooter.OSANO_SCRIPT_SRC;
    script.async = true;

    // Add error handling
    script.onerror = () => {
      console.error('LFXFooter: Failed to load Osano cookie consent script');
      // Dispatch custom event for error handling
      this.dispatchEvent(
        new CustomEvent('cookie-script-error', {
          bubbles: true,
          detail: {
            scriptSrc: LFXFooter.OSANO_SCRIPT_SRC,
            error: 'Script failed to load',
          },
        })
      );
    };

    if (document.head) {
      document.head.appendChild(script);
    } else {
      document.body?.appendChild(script);
    }
  }
}

// Register component
if (typeof window !== 'undefined' && !customElements.get('lfx-footer')) {
  customElements.define('lfx-footer', LFXFooter);
}
