// pages/api/contributions.ts

import { loadThemes, ThemeMap, getSearchParams, getGHevents } from '../../../lib/fetching/main';

export async function GET(request: Request) {
    const {
      user,
      themeName,
} = getSearchParams(request);

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

    const foreignContributions = await getGHevents(user);

    if (foreignContributions === null) {
      return new Response("Could not retrieve foreign contributions", { status: 404 });
    }

    return new Response(foreignContributions.toString(), {
      headers: {
        'Content-Type': 'text',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error("Error generating Raw Repo Count:", err);
    return new Response('Something went wrong', { status: 500 })
  }
}
