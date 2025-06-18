// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

/**
 * Menu item interface matching your data structure
 */
export interface MenuItem {
  label: string;
  icon: string;
  url: string;
  target: '_blank' | '_self';
  styleClass?: string;
  product?: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

/**
 * Default menu data matching your specification
 */
export const DEFAULT_MENU_DATA: MenuSection[] = [
  {
    section: 'Community',
    items: [
      {
        label: 'Crowdfunding',
        icon: 'fa-hand-holding-dollar',
        url: 'https://crowdfunding.lfx.linuxfoundation.org/',
        target: '_blank',
        product: 'crowdfunding',
      },
      {
        label: 'Drive',
        icon: 'fa-folder-open',
        url: 'https://drive.lfx.linuxfoundation.org/',
        target: '_self',
        styleClass: 'active-menu-item',
        product: 'drive',
      },
      {
        label: 'Individual Dashboard',
        icon: 'fa-id-badge',
        url: 'https://openprofile.dev',
        target: '_blank',
        product: 'individual-dashboard',
      },
      {
        label: 'Insights',
        icon: 'fa-chart-line',
        url: 'https://insights.linuxfoundation.org/',
        target: '_blank',
        product: 'insights',
      },
      {
        label: 'Mentorship',
        icon: 'fa-hand-holding-heart',
        url: 'https://mentorship.lfx.linuxfoundation.org/',
        target: '_blank',
        product: 'mentorship',
      },
    ],
  },
  {
    section: 'Organizations',
    items: [
      {
        label: 'Organization Dashboard',
        icon: 'fa-building',
        url: 'https://myorg.lfx.dev/',
        target: '_blank',
        product: 'organization-dashboard',
      },
    ],
  },
  {
    section: 'Projects',
    items: [
      {
        label: 'Community Data',
        icon: 'fa-users',
        url: 'https://cm.lfx.dev/',
        target: '_blank',
        product: 'community-data',
      },
      {
        label: 'EasyCLA',
        icon: 'fa-file-signature',
        url: 'https://easycla.lfx.linuxfoundation.org/',
        target: '_blank',
        product: 'easycla',
      },
      {
        label: 'Project Control Center',
        icon: 'fa-server',
        url: 'https://projectadmin.lfx.linuxfoundation.org/',
        target: '_blank',
        product: 'project-control-center',
      },
      {
        label: 'Security',
        icon: 'fa-shield',
        url: 'https://security.lfx.linuxfoundation.org/',
        target: '_blank',
        product: 'security',
      },
    ],
  },
];
