# LFX UI Core - Cookie Management Deployment Guide

**Version:** 1.0  
**Date:** June 17, 2025  
**Related Ticket:** [LH-2](https://linuxfoundation.atlassian.net/browse/LH-2)

## Overview

This guide provides comprehensive instructions for deploying the LFX Footer component with integrated Osano cookie management across all Linux Foundation environments.

## Supported Environments

### Production Environments

| Environment | Domain | Configuration | Script URL |
|------------|--------|---------------|------------|
| **LFX Production** | `lfx.linuxfoundation.org` | Default Osano | Automatic |
| **LFX Insights** | `insights.linuxfoundation.org` | Default Osano | Automatic |

### Development/Staging Environments

| Environment | Domain | Configuration | Notes |
|------------|--------|---------------|-------|
| **LFX Development** | `lfx.dev` | Default Osano | Full functionality |
| **OpenProfile Dev** | `openprofile.dev` | Default Osano | Full functionality |
| **Local Development** | `localhost:*` | Custom/Mock Script | For testing only |

## Pre-Deployment Checklist

### 1. Osano Configuration Verification

- [ ] Target domain is registered in Osano admin panel
- [ ] Cookie categories are properly configured
- [ ] Privacy policy links are updated
- [ ] Legal compliance requirements are met

### 2. Technical Requirements

- [ ] CSP headers allow `https://cmp.osano.com` 
- [ ] No conflicting cookie management scripts exist
- [ ] Component is properly imported and registered
- [ ] Error monitoring is configured for script loading failures

### 3. Testing Validation

- [ ] Cookie consent UI appears correctly
- [ ] User preferences are properly saved
- [ ] Script loading errors are handled gracefully
- [ ] Component cleanup works on page navigation

## Deployment Instructions

### Basic Implementation

**For production environments (lfx.linuxfoundation.org, insights.linuxfoundation.org):**

```html
<!DOCTYPE html>
<html>
<head>
  <title>LFX Application</title>
  <!-- Ensure CSP allows Osano script loading -->
  <meta http-equiv="Content-Security-Policy" 
        content="script-src 'self' https://cmp.osano.com; object-src 'none';">
</head>
<body>
  <!-- Your application content -->
  
  <!-- LFX Footer with cookie management -->
  <lfx-footer cookie-management-enabled="true"></lfx-footer>
  
  <!-- Import the component -->
  <script src="https://cdn.jsdelivr.net/npm/@linuxfoundation/lfx-ui-core/dist/browser/footer.bundle.js"></script>
</body>
</html>
```

**For development/staging environments:**

```html
<!-- Use custom script URL for staging -->
<lfx-footer 
  cookie-management-enabled="true"
  custom-cookie-script-url="https://staging-cmp.osano.com/your-staging-script.js">
</lfx-footer>
```

### Advanced Configuration

**Event-driven implementation:**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('lfx-footer');
  
  // Enable cookie management
  footer.cookieManagementEnabled = true;
  
  // Handle successful script loading
  footer.addEventListener('cookie-script-loaded', (event) => {
    console.log('Cookie management ready:', event.detail.scriptUrl);
    
    // Optional: Initialize analytics after consent
    if (window.osano && window.osano.cm) {
      window.osano.cm.addEventListener('osano-cm-consent-changed', () => {
        // Handle consent changes
        initializeAnalytics();
      });
    }
  });
  
  // Handle script loading errors
  footer.addEventListener('cookie-script-error', (event) => {
    console.error('Cookie script failed:', event.detail.error);
    
    // Optional: Fallback to basic functionality
    initializeBasicMode();
  });
});
```

## Environment-Specific Configuration

### Production Deployment

**Required Steps:**

1. **Domain Registration**: Ensure the target domain is registered in Osano's admin panel
2. **Script URL**: Use the default Osano script URL (automatic)
3. **CSP Headers**: Configure Content Security Policy to allow Osano domain
4. **Monitoring**: Set up error tracking for script loading failures

**Configuration:**
```html
<lfx-footer cookie-management-enabled="true"></lfx-footer>
```

**CSP Header:**
```
Content-Security-Policy: script-src 'self' https://cmp.osano.com; connect-src 'self' https://cmp.osano.com; object-src 'none';
```

### Staging Environment

**Purpose**: Test cookie functionality before production deployment

**Configuration:**
```html
<lfx-footer 
  cookie-management-enabled="true"
  custom-cookie-script-url="https://staging-cmp.osano.com/staging-script.js">
</lfx-footer>
```

### Development Environment

**Local Development:**
```html
<!-- Mock script for local testing -->
<lfx-footer 
  cookie-management-enabled="true"
  custom-cookie-script-url="https://localhost:3000/mock-cookie-script.js">
</lfx-footer>
```

**Mock Script Example:**
```javascript
// mock-cookie-script.js - For local development only
window.osano = {
  cm: {
    addEventListener: (event, callback) => {
      console.log('Mock: Event listener added for', event);
      // Simulate consent after 2 seconds
      setTimeout(() => callback(), 2000);
    },
    showConsentModal: () => {
      console.log('Mock: Showing consent modal');
    }
  }
};
console.log('Mock Osano script loaded for development');
```

## Validation and Testing

### 1. Functional Testing

**Test Cases:**

- [ ] Cookie consent modal appears on first visit
- [ ] User preferences are saved and persist across sessions
- [ ] Different cookie categories can be enabled/disabled independently
- [ ] Privacy policy links work correctly
- [ ] Component handles script loading errors gracefully

**Testing Script:**
```javascript
// Run in browser console
const footer = document.querySelector('lfx-footer');

// Test 1: Verify component is loaded
console.log('Component loaded:', !!footer);

// Test 2: Verify cookie management is enabled
console.log('Cookie management enabled:', footer.cookieManagementEnabled);

// Test 3: Test error handling
footer.customCookieScriptUrl = 'https://invalid-url.com/script.js';
footer.cookieManagementEnabled = true;

// Check console for error messages
```

### 2. Cross-Browser Testing

**Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Testing Checklist:**
- [ ] Component renders correctly in all browsers
- [ ] Cookie script loads properly
- [ ] Event handling works consistently
- [ ] Shadow DOM styling is applied correctly

### 3. Performance Testing

**Metrics to Monitor:**
- Script loading time (should be < 1 second)
- Component initialization time
- Memory usage after repeated navigation
- Network requests (should only load script once)

## Troubleshooting

### Common Issues

**1. Cookie consent UI not appearing**

*Possible Causes:*
- Domain not configured in Osano admin panel
- CSP headers blocking script loading
- Script URL is incorrect

*Solution:*
```javascript
// Check if script loaded successfully
footer.addEventListener('cookie-script-error', (event) => {
  console.error('Script failed to load:', event.detail);
});
```

**2. Component not rendering**

*Possible Causes:*
- Component script not loaded
- Web Components not supported
- Shadow DOM conflicts

*Solution:*
```javascript
// Verify component registration
console.log('Component defined:', customElements.get('lfx-footer'));
```

**3. Script loading errors**

*Possible Causes:*
- Network connectivity issues
- CORS restrictions
- Invalid script URL

*Solution:*
```javascript
// Add error monitoring
footer.addEventListener('cookie-script-error', (event) => {
  // Send error to monitoring service
  analyticsService.reportError('cookie-script-error', event.detail);
});
```

## Security Considerations

### 1. Content Security Policy

**Minimal CSP for cookie management:**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://cmp.osano.com; 
  connect-src 'self' https://cmp.osano.com;
  style-src 'self' 'unsafe-inline';
```

### 2. Script Integrity

- All scripts are loaded over HTTPS
- Osano provides script integrity verification
- Component includes error handling for compromised scripts

### 3. Data Privacy

- No personal data is stored by the component
- All cookie consent data is managed by Osano
- Component complies with GDPR and CCPA requirements

## Rollback Procedures

### Emergency Rollback

**If critical issues arise:**

1. **Disable cookie management immediately:**
```javascript
document.querySelectorAll('lfx-footer').forEach(footer => {
  footer.cookieManagementEnabled = false;
});
```

2. **Remove existing cookie scripts:**
```javascript
document.querySelectorAll('script[data-lfx-cookie-script]').forEach(script => {
  script.remove();
});
```

3. **Deploy previous version:**
```bash
# Revert to previous component version
npm install @linuxfoundation/lfx-ui-core@previous-version
```

### Gradual Rollback

**For non-critical issues:**

1. **Configure custom script URL to previous version**
2. **Monitor error rates and user experience**
3. **Gradually migrate back to new version after fixes**

## Post-Deployment Monitoring

### Key Metrics

- **Script Load Success Rate**: > 99%
- **Component Initialization Time**: < 500ms
- **User Consent Interaction Rate**: Monitor for UX issues
- **Error Rate**: < 0.1%

### Monitoring Setup

```javascript
// Add performance monitoring
footer.addEventListener('cookie-script-loaded', (event) => {
  performance.mark('cookie-script-loaded');
  analytics.track('cookie_script_loaded', {
    url: event.detail.scriptUrl,
    loadTime: performance.now()
  });
});

footer.addEventListener('cookie-script-error', (event) => {
  analytics.track('cookie_script_error', {
    error: event.detail.error,
    url: event.detail.scriptUrl
  });
});
```

## Support and Maintenance

### Component Updates

- **Regular Updates**: Monitor for new component versions
- **Security Patches**: Apply security updates immediately
- **Feature Updates**: Test in staging before production deployment

### Osano Script Updates

- **Automatic Updates**: Osano handles script updates automatically
- **Version Pinning**: Use custom URLs for version control if needed
- **Change Notifications**: Subscribe to Osano change notifications

## Contact Information

**Development Team:**
- **Primary Contact**: David Deal (ddeal@linuxfoundation.org)
- **Reviewers**: Luis Guerra, Asitha de Silva
- **Stakeholder**: Juliane Galvao

**External Dependencies:**
- **Osano Support**: support@osano.com
- **Documentation**: https://docs.osano.com/

---

*This document is maintained as part of the LFX UI Core project. Please update it when making changes to cookie management functionality.*