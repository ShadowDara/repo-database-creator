// app/api/lib/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { promises as fs } from 'fs'
import path from 'path'

const themesPath = path.join(process.cwd(), 'public/themes.json')
const settingsPath = path.join(process.cwd(), 'public/settings.json')

export async function loadThemes() {
  const file = await fs.readFile(themesPath, 'utf-8')
  return JSON.parse(file) as ThemeMap
}

export type ThemeMap = {
  [key: string]: {
    color: string
    bg_color: string
  }
}

export type ThemeName = keyof ThemeMap
export type Theme = ThemeMap[ThemeName]

// ⬇️ Hilfsfunktion: Theme per Name holen
export async function getThemeByName(name: string): Promise<Theme> {
  const themes = await loadThemes()
  return themes[name] ?? themes['default']
}

export async function getRepoCount(user: string): Promise<number | null> {
    const response = await fetch(`https://api.github.com/users/${user}`, {
      next: { revalidate: 86400 },
      cache: "force-cache",
    })
  
    if (!response.ok) {
      throw new Error('GitHub user not found')
    }
  
    const data = await response.json()
    return data.public_repos
}
