// lib/url.ts

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

export async function getGHuserdata(user: string): Promise<number | null> {
  const cacheTime = settings['cacheTime'];
  const now = Date.now();

  const cached = repoCache.get(user);
  if (cached && now - cached.timestamp < cacheTime * 1000) {
    console.log(`Cache Hit for user: ${user}`);
    return cached.value;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`GitHub API error (${response.status}): ${text}`);
      return null;
    }

    const data = await response.json();

    if (!data || typeof data.public_repos !== "number") {
      console.error("Invalid GitHub response:", data);
      return null;
    }

    console.warn(`Cache Miss for user: ${user}, fetched from GitHub API`);
    repoCache.set(user, { value: data.public_repos, timestamp: now });

    return data.public_repos;

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}
