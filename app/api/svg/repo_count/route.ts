// app/api/github/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user') || "shadowdara";

  try {
    // GitHub API für Repositories
    const response = await fetch(`https://api.github.com/users/${user}`, {
      next: { revalidate: 60000 }, // Cache und Revalidate alle 60.000 Sekunden
      cache: "force-cache",
    });

    if (!response.ok) {
      return new Response('GitHub user not found', { status: response.status })
    }

    const data = await response.json()
    const repoCount = data.public_repos

    const svg = `
      <svg width="320" height="80" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#238636" />
            <stop offset="100%" stop-color="#0d1117" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00000055"/>
          </filter>
        </defs>
        <rect width="320" height="80" rx="16" fill="url(#bgGradient)" filter="url(#shadow)" />
        
        <g transform="translate(24, 50)">
          <text x="0" y="-15" font-family="Segoe UI, sans-serif" font-size="20" fill="#ffffff" font-weight="bold">
            ${user}
          </text>
          <text x="0" y="12" font-family="Segoe UI, sans-serif" font-size="14" fill="#c9d1d9">
            Public Repositories: ${repoCount}
          </text>
        </g>

        <g transform="translate(270, 24)">
          <circle cx="20" cy="20" r="20" fill="#161b22" />
          <path fill="#58a6ff" d="M18 13h4v14h-4zM13 18h4v9h-4zM23 16h4v11h-4z"/>
        </g>
      </svg>
    `

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    return new Response('Something went wrong', { status: 500 })
  }
}
