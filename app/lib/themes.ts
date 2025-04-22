// app/lib/themes.ts

import { themes } from '../lib/js/themes';

export async function loadThemes() {
  return themes;
}

export type ThemeMap = {
  [key: string]: {
    color: string;
    bg_color: string;
  };
};
