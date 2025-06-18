// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

/**
 * Jest test setup file
 */

// Mock DOM environment for Web Components
class MockHTMLElement {
  shadowRoot: any = null;
  isConnected = true;
  private attributes: Map<string, string> = new Map();
  parentNode: any = null;
  
  constructor() {
    this.shadowRoot = {
      innerHTML: '',
      appendChild: jest.fn(),
      removeChild: jest.fn()
    };
  }

  attachShadow(options: any) {
    return this.shadowRoot;
  }

  setAttribute(name: string, value: string) {
    const oldValue = this.attributes.get(name) || null;
    this.attributes.set(name, value);
    
    // Trigger attributeChangedCallback if component has observedAttributes
    if ((this.constructor as any).observedAttributes?.includes(name)) {
      this.attributeChangedCallback(name, oldValue, value);
    }
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) || null;
  }

  hasAttribute(name: string): boolean {
    return this.attributes.has(name);
  }

  removeAttribute(name: string) {
    const oldValue = this.attributes.get(name) || null;
    this.attributes.delete(name);
    
    // Trigger attributeChangedCallback if component has observedAttributes
    if ((this.constructor as any).observedAttributes?.includes(name)) {
      this.attributeChangedCallback(name, oldValue, null);
    }
  }

  connectedCallback() {
    // Mock implementation
  }

  disconnectedCallback() {
    // Mock implementation
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // Mock implementation
  }

  dispatchEvent(event: any): boolean {
    // Mock implementation
    return true;
  }
}

// Mock global HTMLElement
(global as any).HTMLElement = MockHTMLElement;

Object.defineProperty(window, 'customElements', {
  value: {
    define: jest.fn(),
    get: jest.fn()
  }
});

// Mock document methods
document.createElement = jest.fn((tagName: string) => {
  const element = {
    tagName: tagName.toUpperCase(),
    src: '',
    type: '',
    async: false,
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    onerror: null,
    onload: null,
    parentNode: null
  };
  return element as any;
});

// Mock document.head using Object.defineProperty
Object.defineProperty(document, 'head', {
  value: {
    appendChild: jest.fn(),
    removeChild: jest.fn()
  },
  writable: true,
  configurable: true
});

// Console setup for tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};