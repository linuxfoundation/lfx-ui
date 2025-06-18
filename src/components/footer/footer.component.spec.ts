// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { LFXFooter } from './footer.component';

describe('LFXFooter Component', () => {
  let footer: LFXFooter;
  let mockShadowRoot: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockShadowRoot = {
      innerHTML: '',
    };

    // Don't mock attachShadow since our global mock handles it
    footer = new LFXFooter();

    // Override the shadowRoot with our specific mock for these tests
    Object.defineProperty(footer, 'shadowRoot', {
      value: mockShadowRoot,
      writable: true,
    });
  });

  afterEach(() => {
    if (footer && footer.parentNode) {
      footer.parentNode.removeChild(footer);
    }
  });

  describe('Component Initialization', () => {
    test('should create footer component', () => {
      expect(footer).toBeInstanceOf(LFXFooter);
      expect(footer).toBeInstanceOf(HTMLElement);
    });

    test('should attach shadow DOM', () => {
      expect(footer.shadowRoot).toBe(mockShadowRoot);
    });

    test('should render template on connectedCallback', () => {
      footer.connectedCallback();

      expect(mockShadowRoot.innerHTML).toContain('footer-container');
      expect(mockShadowRoot.innerHTML).toContain('Copyright');
      expect(mockShadowRoot.innerHTML).toContain('The Linux Foundation');
    });

    test('should include current year in copyright', () => {
      footer.connectedCallback();

      const currentYear = new Date().getFullYear();
      expect(mockShadowRoot.innerHTML).toContain(currentYear.toString());
    });

    test('should include legal links in footer', () => {
      footer.connectedCallback();

      expect(mockShadowRoot.innerHTML).toContain('Platform Usage');
      expect(mockShadowRoot.innerHTML).toContain('Privacy Policy');
      expect(mockShadowRoot.innerHTML).toContain('Trademark Usage');
      expect(mockShadowRoot.innerHTML).toContain('Policies');
    });

    test('should include proper link attributes', () => {
      footer.connectedCallback();

      expect(mockShadowRoot.innerHTML).toContain('target="_blank"');
      expect(mockShadowRoot.innerHTML).toContain('rel="noopener noreferrer"');
    });
  });

  describe('Template Generation', () => {
    test('should generate template with styles', () => {
      footer.connectedCallback();

      expect(mockShadowRoot.innerHTML).toContain('<style>');
    });

    test('should generate template with footer structure', () => {
      footer.connectedCallback();

      expect(mockShadowRoot.innerHTML).toContain('class="footer-container"');
      expect(mockShadowRoot.innerHTML).toContain('class="footer-content"');
      expect(mockShadowRoot.innerHTML).toContain('class="copyright-container"');
      expect(mockShadowRoot.innerHTML).toContain('class="copyright"');
    });
  });

  describe('Shadow DOM Integration', () => {
    test('should handle missing shadowRoot gracefully', () => {
      const footerWithoutShadow = new LFXFooter();
      (footerWithoutShadow as any).shadowRoot = null;

      expect(() => footerWithoutShadow.connectedCallback()).not.toThrow();
    });
  });
});
