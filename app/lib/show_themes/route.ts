// show_themes/route.ts

import { themes} from '../themes';

let cachedThemes: string | null = null;

export async function GET() {
    if (!cachedThemes) {
        cachedThemes = JSON.stringify(themes);
        console.warn("Themes loaded and cached.");
    } else {
        console.log("Themes served from cache.");
    }

    return new Response(cachedThemes, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
