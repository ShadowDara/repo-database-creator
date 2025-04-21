import { promises as fs } from 'fs'
import path from 'path'

const themesPath = path.join(process.cwd(), 'public/themes.json')

export async function GET(req: NextRequest) {
  const file = await fs.readFile(themesPath, 'utf-8')
  const themes = JSON.parse(file)

  // Dynamisch abgeleitete Typen
  type ThemeMap = typeof themes
  type ThemeName = keyof ThemeMap
  type Theme = ThemeMap[ThemeName]

  const currentThemeName: ThemeName = 'default'
  const currentTheme: Theme = themes[currentThemeName]

  // Beispielverwendung
  const color = currentTheme.color
  const bgColor = currentTheme.bg_color

  const { searchParams } = new URL(req.url)
  const user = searchParams.get('user') || "shadowdara";
}
