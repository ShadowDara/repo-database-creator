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

export async function getRepoCount(user: string): Promise<number | null> {
  const cacheTime = settings['cacheTime'];

  try {
    const response = await fetch(`https://api.github.com/users/${user}`, {
      next: { revalidate: cacheTime },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API error for user "${user}": ${response.status} - ${errorText}`);
      return null;
    }

    const data = await response.json();

    if (!data || typeof data.public_repos !== 'number') {
      console.error(`Unexpected response shape for user "${user}":`, data);
      return null;
    }

    console.log(`Cache ${response.headers.get("x-vercel-cache") ?? "status unknown"} for user: ${user}`);
    return data.public_repos;

  } catch (err) {
    console.error(`Unexpected error while fetching repo count for "${user}":`, err);
    return null;
  }
}
