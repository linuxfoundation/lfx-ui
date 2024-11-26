// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

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
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

        :host {
          display: block;
          background: var(--lfx-footer-bg, transparent);
          padding: 3rem 2rem 0 2rem;
          color: var(--lfx-footer-text, #5b6367);
          font-family: 'Open Sans', sans-serif;
        }

        :host * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-size: 0.75rem;
          color: #808b91;
          text-decoration: none;
        }

        .footer-container {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer-content {
          text-align: center;
          font-size: 0.75rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-links {
          display: flex;
          gap: 1rem;
          color: #808b91
          font-size: 0.75rem;
        }

        .footer-links a {
          color: #5b6367;
          text-decoration: none;
          font-size: 0.75rem;
        }

        .footer-links a:hover {
          text-decoration: underline;
          color: #5b6367;
        }

        .copyright-container {
          display: flex;
          flex-direction: column;
        }

        .copyright {
          font-size: 0.75rem;
        }

        .copyright a {
          color: #5b6367;
        }

        .copyright a:hover {
          text-decoration: underline;
          color: #5b6367;
        }

      </style>

      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-links">
            <a href="https://www.linuxfoundation.org/legal/privacy-policy?hsLang=en">Privacy Policy</a>
            <span>|</span>
            <a href="https://www.linuxfoundation.org/legal/trademark-usage?hsLang=en">Trademark Usage</a>
          </div>
          <div class="copyright-container">
            <p class="copyright">Copyright &copy; ${new Date().getFullYear()} The Linux Foundation&reg;. All rights reserved.
            The Linux Foundation has registered trademarks and uses trademarks.</p>
            <p class="copyright">For more information, including terms of use, privacy policy,
            and trademark usage, please see our <a href="https://www.linuxfoundation.org/legal/policies">Policies</a> page.
            </p>
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
