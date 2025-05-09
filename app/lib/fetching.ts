// lib/fetching.ts

// made by shadowdara
// 2025
// LICENSE: MIT

// Data fetching and caching for Github API
// This module handles fetching user data, repository data, and events data from the Github API.
// It also includes caching mechanisms to reduce the number of API calls.

// It exports functions to load themes, escape CSV data, and handle URL request parameters.
// It also exports functions to fetch user data, repository data, and events data from the Github API.

// It provides a function to create SVG gradient stops based on the provided colors.


// import data from Javascript
import { settings } from './settings';
import { themes } from './themes';


// ===== DATA CACHING =====
//
// Cache for Github Userdata
const repoCache = new Map<string, { value: Userdata; timestamp: number }>();

// Cache for Github Repository Data
const repoCache2 = new Map<string, { value: Repository[]; timestamp: number }>();

// Cache for Github Events Data
const repoCache3 = new Map<string, { value: Events[]; timestamp: number }>();


// ===== DATA STRUCTURES =====
//
// Structure for the Userdata from Github
interface Userdata {
  public_repos: number;
  public_gists: number;
  created_at: string;

  //login: string;
  //id: number;
  //followers: number;
  //following: number;
}

// Structure for the Repository Data from Github
interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

// Structure for the Events Data from Github
interface Events {
  id: string;
  type: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
  };
  created_at: string;
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


// to save CSV Data from invalid characters
export function csvEscape(value: string) {
  const needsQuotes = /[",\n\r]/.test(value);
  if (needsQuotes) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}


// ====== URL REQUEST HANDLING =====
//
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
    use_theme: searchParams.get("use_theme") || "false", // only used for the medal
  };
}


// ===== DATA FETCHING ======
//
// Fetch Userdata from Github
export async function getGHuserdata(user: string): Promise<Userdata | null> {
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

    const data: Userdata = await response.json();

    if (!data) {
      console.error("Invalid GitHub response:", data);
      return null;
    }

    console.warn(`Cache Miss for user: ${user}, fetched from GitHub API`);
    repoCache.set(user, { value: data, timestamp: now });

    return data;

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


// Fetch Eevent data from a Github user
export async function getGHevents(user: string): Promise<Events[] | null> {
  const cacheTime = settings['cacheTime'];
  const now = Date.now();

  const cached = repoCache3.get(user);
  if (cached && now - cached.timestamp < cacheTime * 1000) {
    console.log(`Cache Hit for user: ${user}`);
    return cached.value;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100`);

    if (!response.ok) {
      const text = await response.text();
      console.error(`GitHub API error (${response.status}): ${text}`);
      return null;
    }

    const data: Events[] = await response.json();

    if (!Array.isArray(data)) {
      console.error("Invalid GitHub response (not an array):", data);
      return null;
    }

    console.warn(`Cache Miss for user: ${user}, fetched from GitHub API`);
    repoCache3.set(user, { value: data, timestamp: now });

    return data;

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}


// ===== SVG GRADIENT BACKGROUND =====
//
// function to make the gradient backgrund for the SVG with up
// to 6 colors
export function createGradientStops(bg_color: string | string[]) {
  const colors = Array.isArray(bg_color) ? bg_color.slice(0, 6) : [bg_color, bg_color];

  const count = colors.length;

  if (count < 1) return "No Colors"

  return colors
    .map((color, index) => {
      const offset = (count === 1) ? 0 : (index * 100) / (count - 1);
      return `<stop offset="${offset.toFixed(2)}%" stop-color="#${color}" />`;
    }).join("\n")
}


// ===== LOADING THE SITEMAP =====
// soon
