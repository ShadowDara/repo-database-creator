// lib/url.ts

// import data from Javascript
import { settings } from './settings';
import { themes } from './themes';


// Cache for Github Userdata
const repoCache = new Map<string, { value: number; timestamp: number }>();

// Cache for Github Repository Data
const repoCache2 = new Map<string, { value: Repository[]; timestamp: number }>();


// Structure for the Repository Data from Github
interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}


// Strcuture for loading the themes
export type ThemeMap = {
  [key: string]: {
    color: string;
    st_color: string;
    bg_color: string | string[];
  };
};


// fucntion to load the themes
export async function loadThemes() {
  return themes;
}


// function make CSV Data secure from invalid characters
export function csvEscape(value: string) {
  const needsQuotes = /[",\n\r]/.test(value);
  if (needsQuotes) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}


// to get the search Params from the Link
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


// Fetch Userdata from Github
export async function getGHuserdata(user: string): Promise<number | null> {
  const cacheTime = settings['cacheTime'];
  const now = Date.now();

  const cached = repoCache.get(user);
  if (cached && now - cached.timestamp < cacheTime * 1000) {
    console.log(`Cache Hit for user: ${user}`);
    return cached.value;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`GitHub API error (${response.status}): ${text}`);
      return null;
    }

    const data = await response.json();

    if (!data || typeof data.public_repos !== "number") {
      console.error("Invalid GitHub response:", data);
      return null;
    }

    console.warn(`Cache Miss for user: ${user}, fetched from GitHub API`);
    repoCache.set(user, { value: data.public_repos, timestamp: now });

    return data.public_repos;

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}


// Fetch Repository Data from Github
export async function getGHrepodata(user: string): Promise<Repository[] | null> {
  const cacheTime = settings['cacheTime'];
  const now = Date.now();

  const cached = repoCache2.get(user);
  if (cached && now - cached.timestamp < cacheTime * 1000) {
    console.log(`Cache Hit for user: ${user}`);
    return cached.value;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`);

    if (!response.ok) {
      const text = await response.text();
      console.error(`GitHub API error (${response.status}): ${text}`);
      return null;
    }

    const data: Repository[] = await response.json();

    if (!Array.isArray(data)) {
      console.error("Invalid GitHub response (not an array):", data);
      return null;
    }

    console.warn(`Cache Miss for user: ${user}, fetched from GitHub API`);
    repoCache2.set(user, { value: data, timestamp: now });

    return data;

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}


// function to make the gradient backgrund for the SVG
export function createGradientStops(bg_color: string | string[]) {
  const colors = Array.isArray(bg_color) ? bg_color : [bg_color, bg_color];

  return `
    <stop offset="0%" stop-color="#${colors[0]}" />
    <stop offset="100%" stop-color="#${colors[1]}" />
  `;
}
