// app/lib/show_themes.ts

import { themes } from './themes';

export async function GET(request: Request) {
    return new Response(JSON.stringify(themes), {
        status: 200,
        headers: { "Content-Type": "text/plain" },
    });
}
