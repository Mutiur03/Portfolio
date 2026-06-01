import { NextResponse } from 'next/server';
import { getRateLimitStatus } from '@/lib/github-languages';

export async function GET() {
  const rateLimit = await getRateLimitStatus();
  const responseOptions = {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  };

  if (!rateLimit) {
    return NextResponse.json(
      { error: 'Could not load GitHub API rate limit.' },
      { ...responseOptions, status: 502 }
    );
  }

  return NextResponse.json(rateLimit, responseOptions);
}
