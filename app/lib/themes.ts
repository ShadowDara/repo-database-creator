// app/lib/loadThemes.ts

import { themes } from '../lib/js/themes';

export function loadThemes() {
  return themes;
}

export type ThemeMap = {
  [key: string]: {
    color: string;
    bg_color: string;
  };
};
