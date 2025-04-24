// app/lib/show_themes.ts

import { themes } from '../themes';

export async function GET(request: Request) {
    console.warn("Ask for Theme List")
    return new Response(JSON.stringify(themes), {
        status: 200,
        headers: { "Content-Type": "text/plain" },
    });
}
