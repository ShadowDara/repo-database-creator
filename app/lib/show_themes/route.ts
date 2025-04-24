// app/lib/show_themes.ts

import { themes } from '../themes';

let cachedThemes: string | null = null;

export async function GET(request: Request) {
    console.warn("Ask for Theme List");

    if (!cachedThemes) {
        cachedThemes = JSON.stringify(themes);
        console.log("Themes loaded and cached.");
    } else {
        console.log("Themes served from cache.");
    }

    return new Response(cachedThemes, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
