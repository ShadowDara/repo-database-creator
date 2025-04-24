// app/api/raw/themes/route.ts

import { NextResponse } from "next/server";
import { themes } from '../../../lib/themes';

export async function GET(request: Request) {
    return new NextResponse(themes, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
    });
}
