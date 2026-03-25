// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

/**
 * A single changelog entry returned by the public API
 */
export interface ChangelogEntry {
  id: string;
  title: string;
  description: string;
  version: string | null;
  slug: string | null;
  publishedAt: string | Date | null;
  createdAt: string | Date;
  product: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  } | null;
}

/**
 * API response shape for the public changelogs endpoint
 */
export interface ChangelogApiResponse {
  success: boolean;
  data: ChangelogEntry[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Attributes accepted by the lfx-changelog element
 */
export interface LFXChangelogAttributes {
  /** Product slug to filter changelogs (required) */
  product: string;
  /** Color theme — "light" or "dark" */
  theme: 'light' | 'dark';
  /** Maximum number of entries to show (1–25, default 10) */
  limit: number;
  /** Override the API base URL (defaults to https://changelog.lfx.dev) */
  'base-url': string;
}
