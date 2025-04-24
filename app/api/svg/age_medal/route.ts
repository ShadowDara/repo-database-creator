// app/api/svg/repo_count/route.ts

// to generate an SVG file with the Account Age of the Repository User

import { loadThemes, ThemeMap, getSearchParams, getGHuserdata, createGradientStops } from '../../../lib/url';

export async function GET(request: Request) {
  const {
    user,
  } = getSearchParams(request);

  try {
    const udata = await getGHuserdata(user);

    if (udata === null) {
      return new Response("Could not retrieve Github User data", { status: 404 });
    }

    const createdAt = new Date(udata?.created_at);
    const now = new Date();

    let years = now.getFullYear() - createdAt.getFullYear();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="50">
  <defs>
    <linearGradient id="gold-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD700" />
      <stop offset="50%" stop-color="#FFC300" />
      <stop offset="100%" stop-color="#FFB200" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="400" height="50" rx="10" fill="url(#gold-bg)" />
  <text x="15" y="32" font-size="22" font-family="Segoe UI">🏆</text>
  <text x="55" y="32" font-size="20" font-family="Segoe UI" font-weight="600" fill="#1e1e1e">
  ${user}'s Account Age: ${years}
  </text>
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
