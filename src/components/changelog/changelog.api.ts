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

  let data: ChangelogApiResponse;
  try {
    data = await response.json();
  } catch {
    throw new Error('Failed to parse changelogs response as JSON');
  }

  if (data && data.success === false) {
    throw new Error(`Failed to fetch changelogs: ${(data as unknown as Record<string, unknown>).message ?? 'Unknown error'}`);
  }

  return data;
}
