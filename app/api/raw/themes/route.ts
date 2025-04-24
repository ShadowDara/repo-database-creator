// app/api/raw/themes/route.ts

import { themes } from '../../../lib/themes';

export async function GET(request: Request) {
    return new Response(JSON.stringify(themes), {
        status: 200,
        headers: { "Content-Type": "text/plain" },
    });
}
