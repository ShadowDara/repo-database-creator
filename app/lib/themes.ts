import { promises as fs } from 'fs'
import path from 'path'

const themesPath = path.join(process.cwd(), 'lib/themes/themes.json') // <-- neue Pfadangabe

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
