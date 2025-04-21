// lib/url.ts
import { promises as fs } from 'fs'
import path from 'path'

const settingsPath = path.join(process.cwd(), 'app/lib/settings.json')

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
      themeName: searchParams.get("theme") || "default",
    };
}

export async function getRepoCount(user: string): Promise<number | null> {
  const file = await fs.readFile(settingsPath, 'utf-8')
  const json = JSON.parse(file)

  const response = await fetch(`https://api.github.com/users/${user}`, {
    next: { revalidate: json['cache-time'] }, // in seconds
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error('GitHub user not found')
  }

  const data = await response.json()
  return data.public_repos
}
