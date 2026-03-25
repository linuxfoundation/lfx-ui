// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

import type { ChangelogApiResponse } from './changelog.types';

/**
 * Fetch published changelog entries from the public API
 */
export async function fetchChangelogs(productSlug: string, limit: number, baseUrl: string, signal?: AbortSignal): Promise<ChangelogApiResponse> {
  const url = new URL('/public/api/changelogs', baseUrl);
  url.searchParams.set('productSlug', productSlug);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('page', '1');

  const response = await fetch(url.toString(), {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch changelogs: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
