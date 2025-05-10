// contribution_list/route.ts

// to gererate a list of foreign contributions from a user

import { loadThemes, ThemeMap, getSearchParams, getGHevents } from '../../../lib/fetching';

export async function GET(request: Request) {
  const { user, themeName } = getSearchParams(request);

  try {
    const themes = await loadThemes();

    if (!themes || typeof themes !== 'object') {
      console.error("Themes not loaded or invalid:", themes);
      return new Response("Theme loading failed", { status: 500 });
    }

    const theme = (themes as ThemeMap)[themeName];

    if (!user || typeof user !== "string") {
      return new Response("Missing or invalid 'user' parameter", { status: 400 });
    }

    const events = await getGHevents(user);

    if (events === null) {
      return new Response("Could not retrieve GitHub events", { status: 404 });
    }

    // 1. Nur PushEvents behalten
    const pushEvents = events.filter(event => event.type === "PushEvent");

    // 2. Fremde Repositories extrahieren
    const foreignRepos = new Set<string>();

    for (const event of pushEvents) {
      const repoName = event.repo?.name;
      const owner = repoName?.split('/')[0];

      if (repoName && owner !== user) {
        foreignRepos.add(repoName);
      }
    }

    return new Response(JSON.stringify([...foreignRepos], null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (err) {
    console.error("Error generating foreign contributions:", err);
    return new Response('Something went wrong', { status: 500 });
  }
}
