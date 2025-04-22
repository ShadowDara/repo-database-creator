// lib/url.ts

import { NextResponse } from "next/server";
import { settings } from '../lib/js/settings';

export function getSearchParams(request: Request) {
  const { searchParams } = new URL(request.url);

  return {
    user: searchParams.get("user") || "shadowdara",
    includeDescription: searchParams.get("description") || "true",
    includeLanguage: searchParams.get("language") || "true",
    show_name: searchParams.get("show_name") || "true",
    show_user: searchParams.get("show_user") || "false",
    show_link: searchParams.get("link") || "false",
    show_id: searchParams.get("id") || "false",
    themeName: searchParams.get("theme") || "daras_green",
  };
}

const repoCache = new Map<string, { value: number; timestamp: number }>();

export async function getRepoCount(user: string): Promise<number | null> {
  const cacheTime = settings['cacheTime'];
  const now = Date.now();

  const cached = repoCache.get(user);
  if (cached && now - cached.timestamp < cacheTime * 1000) {
    console.log('Cache Hit for user:', user);
    return cached.value;
  }

  const response = await fetch(`https://api.github.com/users/${user}`, {
    next: { revalidate: cacheTime },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error('GitHub user not found');
  }

  const data = await response.json();
  repoCache.set(user, { value: data.public_repos, timestamp: now });

  console.warn('Cache Miss, fetched from GitHub API');
  return data.public_repos;
}
