// app/api/svg/repo_count/route.ts

// to generate the raw public Repository count of a user

import { loadThemes, ThemeMap, getSearchParams, getGHuserdata } from '../../../lib/fetching';

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

    const repoCount = await getGHuserdata(user);

    if (repoCount === null) {
      return new Response("Could not retrieve repo count", { status: 404 });
    }

    return new Response(repoCount.toString(), {
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
