// app/api/svg/repo_count/route.ts

// to generate an SVG file with the Repository count of the User

import { loadThemes, ThemeMap, getSearchParams, getGHuserdata, createGradientStops } from '../../../lib/fetching/main';

export async function GET(request: Request) {
  const {
    user,
    themeName,
  } = getSearchParams(request);

  try {
    const udata = await getGHuserdata(user);

    if (udata === null) {
      return new Response("Could not retrieve Github User data", { status: 404 });
    }

    const themes = await loadThemes();

    if (!themes || typeof themes !== 'object') {
      console.error("Themes not loaded or invalid:", themes);
      return new Response("Theme loading failed", { status: 500 });
    }

    const theme = (themes as ThemeMap)[themeName];

    const svg = `<svg width="320" height="80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
        ${createGradientStops(theme.bg_color)}
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00000055"/>
      </filter>
    </defs>
    <rect width="320" height="80" rx="16" fill="url(#bgGradient)" filter="url(#shadow)" />
    
    <g transform="translate(24, 50)">
      <text x="0" y="-15" font-family="Segoe UI, sans-serif" font-size="20" fill="#${theme.color}" font-weight="bold">
        ${user}
      </text>
      <text x="0" y="12" font-family="Segoe UI, sans-serif" font-size="14" fill="#${theme.st_color}">
        Public Repositories: ${udata.public_repos}
      </text>
    </g>

    <g transform="translate(270, 24)">
      <circle cx="20" cy="20" r="20" fill="#161b22" />
      <path fill="#58a6ff" d="M18 13h4v14h-4zM13 18h4v9h-4zM23 16h4v11h-4z"/>
    </g>
  </svg>`

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error("Error generating SVG:", err);
    return new Response('Something went wrong', { status: 500 })
  }
}
