// cron/route.ts

// cron job which runs every hour

import { NextRequest, NextResponse } from 'next/server';
import handler from '@/app/lib/timer';

export async function GET(req: NextRequest) {
  const secret = req.headers.get('CRON_SECRET');
  
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  handler();
  return NextResponse.json({ ok: true });
}
