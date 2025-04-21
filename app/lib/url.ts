// lib/url.ts
import { settings } from '../lib/js/settings.js';

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
    themeName: searchParams.get("theme") || "daras-green",
  };
}

export async function getRepoCount(user: string): Promise<number | null> {
  const cacheTime = settings['cache-time'];

  const response = await fetch(`https://api.github.com/users/${user}`, {
    next: { revalidate: cacheTime }, // in Sekunden
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error('GitHub user not found');
  }

  const data = await response.json();
  return data.public_repos;
}
