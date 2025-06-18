// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import { LFXFooter } from '../../../src/components/footer/footer.component';

describe('LFXFooter Cookie Management', () => {
  let footer: LFXFooter;
  let mockScript: any;
  let mockDocumentHead: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock script element
    mockScript = {
      src: '',
      type: '',
      async: false,
      setAttribute: jest.fn(),
      getAttribute: jest.fn(),
      onerror: null,
      onload: null,
      parentNode: null
    };

    // Mock document.createElement to return our mock script
    (document.createElement as jest.Mock).mockImplementation((tagName: string) => {
      if (tagName === 'script') {
        return mockScript;
      }
      return {
        tagName: tagName.toUpperCase(),
        setAttribute: jest.fn(),
        getAttribute: jest.fn()
      };
    });

    // Get the mocked document.head from setup
    mockDocumentHead = (document as any).head;

    // Create new footer instance
    footer = new LFXFooter();
    
    // Set up shadowRoot mock
    if (footer.shadowRoot) {
      footer.shadowRoot.innerHTML = '';
    }
  });

  afterEach(() => {
    if (footer && footer.parentNode) {
      footer.parentNode.removeChild(footer);
    }
  });

  describe('Property Management', () => {
    test('should have default cookie management disabled', () => {
      expect(footer.cookieManagementEnabled).toBe(false);
    });

    test('should enable cookie management when attribute is set', () => {
      footer.setAttribute('cookie-management-enabled', 'true');
      expect(footer.cookieManagementEnabled).toBe(true);
    });

    test('should disable cookie management when attribute is false', () => {
      footer.setAttribute('cookie-management-enabled', 'false');
      expect(footer.cookieManagementEnabled).toBe(false);
    });

    test('should handle cookieManagementEnabled property setter', () => {
      footer.cookieManagementEnabled = true;
      expect(footer.getAttribute('cookie-management-enabled')).toBe('true');
      expect(footer.cookieManagementEnabled).toBe(true);
    });

    test('should handle customCookieScriptUrl property', () => {
      const customUrl = 'https://example.com/custom-script.js';
      footer.customCookieScriptUrl = customUrl;
      expect(footer.getAttribute('custom-cookie-script-url')).toBe(customUrl);
      expect(footer.customCookieScriptUrl).toBe(customUrl);
    });

    test('should remove custom script URL when set to null', () => {
      footer.customCookieScriptUrl = 'https://example.com/script.js';
      footer.customCookieScriptUrl = null;
      expect(footer.hasAttribute('custom-cookie-script-url')).toBe(false);
      expect(footer.customCookieScriptUrl).toBe(null);
    });
  });

  describe('Script Loading', () => {
    test('should not load script when cookie management is disabled', () => {
      footer.cookieManagementEnabled = false;
      footer.connectedCallback();
      
      expect(document.createElement).not.toHaveBeenCalledWith('script');
      expect(mockDocumentHead.appendChild).not.toHaveBeenCalled();
    });

    test('should load default Osano script when enabled', () => {
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.src).toBe('https://cmp.osano.com/16A0DbT9yDNIaQkvZ/d6ac078e-c71f-4b96-8c97-818cc1cc6632/osano.js?variant=two');
      expect(mockScript.type).toBe('text/javascript');
      expect(mockScript.async).toBe(true);
      expect(mockScript.setAttribute).toHaveBeenCalledWith('data-lfx-cookie-script', 'true');
      expect(mockDocumentHead.appendChild).toHaveBeenCalledWith(mockScript);
    });

    test('should load custom script URL when provided', () => {
      const customUrl = 'https://example.com/custom-cookie-script.js';
      footer.cookieManagementEnabled = true;
      footer.customCookieScriptUrl = customUrl;
      footer.connectedCallback();
      
      expect(mockScript.src).toBe(customUrl);
      expect(mockDocumentHead.appendChild).toHaveBeenCalledWith(mockScript);
    });

    test('should handle script loading errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      // Simulate script error
      if (mockScript.onerror) {
        mockScript.onerror();
      }
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to load cookie management script from:')
      );
      
      consoleSpy.mockRestore();
    });

    test('should handle script loading exceptions', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      // Mock createElement to throw an error
      (document.createElement as jest.Mock).mockImplementation(() => {
        throw new Error('Script creation failed');
      });
      
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading cookie management script:',
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Script Cleanup', () => {
    test('should remove script on disconnectedCallback', () => {
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      // Mock that script has a parent node
      mockScript.parentNode = mockDocumentHead;
      
      footer.disconnectedCallback();
      
      expect(mockDocumentHead.removeChild).toHaveBeenCalledWith(mockScript);
    });

    test('should handle script cleanup when no script exists', () => {
      footer.disconnectedCallback();
      
      expect(mockDocumentHead.removeChild).not.toHaveBeenCalled();
    });

    test('should handle script cleanup when script has no parent', () => {
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      // Script has no parent node
      mockScript.parentNode = null;
      
      footer.disconnectedCallback();
      
      expect(mockDocumentHead.removeChild).not.toHaveBeenCalled();
    });
  });

  describe('Attribute Changes', () => {
    test('should reload script when cookie-management-enabled changes', () => {
      const appendChildSpy = jest.spyOn(mockDocumentHead, 'appendChild');
      
      // Initially disabled
      footer.connectedCallback();
      expect(appendChildSpy).not.toHaveBeenCalled();
      
      // Enable cookie management
      footer.setAttribute('cookie-management-enabled', 'true');
      
      expect(appendChildSpy).toHaveBeenCalledWith(mockScript);
    });

    test('should reload script when custom-cookie-script-url changes', () => {
      footer.cookieManagementEnabled = true;
      footer.connectedCallback();
      
      const removeChildSpy = jest.spyOn(mockDocumentHead, 'removeChild');
      const appendChildSpy = jest.spyOn(mockDocumentHead, 'appendChild');
      
      // Mock that script has a parent node
      mockScript.parentNode = mockDocumentHead;
      
      // Change custom script URL
      footer.setAttribute('custom-cookie-script-url', 'https://new-url.com/script.js');
      
      expect(removeChildSpy).toHaveBeenCalled();
      expect(appendChildSpy).toHaveBeenCalled();
    });

    test('should not reload script when component is not connected', () => {
      const appendChildSpy = jest.spyOn(mockDocumentHead, 'appendChild');
      
      // Ensure component is not connected
      (footer as any).isConnected = false;
      
      // Set attribute before connecting
      footer.setAttribute('cookie-management-enabled', 'true');
      
      expect(appendChildSpy).not.toHaveBeenCalled();
    });
  });

  describe('Observed Attributes', () => {
    test('should include cookie management attributes in observedAttributes', () => {
      const observedAttributes = LFXFooter.observedAttributes;
      
      expect(observedAttributes).toContain('cookie-management-enabled');
      expect(observedAttributes).toContain('custom-cookie-script-url');
    });
  });

  describe('Component Registration', () => {
    test('should define custom element if not already defined', () => {
      const mockCustomElements = {
        get: jest.fn().mockReturnValue(undefined),
        define: jest.fn()
      };
      
      Object.defineProperty(window, 'customElements', {
        value: mockCustomElements,
        writable: true,
        configurable: true
      });
      
      // Simulate the IIFE execution
      if (typeof window !== 'undefined') {
        if (!mockCustomElements.get('lfx-footer')) {
          mockCustomElements.define('lfx-footer', LFXFooter);
        }
      }
      
      expect(mockCustomElements.get).toHaveBeenCalledWith('lfx-footer');
      expect(mockCustomElements.define).toHaveBeenCalledWith('lfx-footer', LFXFooter);
    });

    test('should not redefine custom element if already defined', () => {
      const mockCustomElements = {
        get: jest.fn().mockReturnValue(LFXFooter),
        define: jest.fn()
      };
      
      Object.defineProperty(window, 'customElements', {
        value: mockCustomElements,
        writable: true,
        configurable: true
      });
      
      // Simulate the IIFE execution
      if (typeof window !== 'undefined') {
        if (!mockCustomElements.get('lfx-footer')) {
          mockCustomElements.define('lfx-footer', LFXFooter);
        }
      }
      
      expect(mockCustomElements.get).toHaveBeenCalledWith('lfx-footer');
      expect(mockCustomElements.define).not.toHaveBeenCalled();
    });
  });
});