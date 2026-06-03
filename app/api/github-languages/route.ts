import { NextRequest, NextResponse } from 'next/server';
import {
  ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
  GITHUB_CACHE_SECONDS,
  getRateLimitStatus,
  isValidGitHubUsername,
} from '@/lib/github-languages';
import { getRouteCachedGitHubLanguageAnalysis } from './route-cache';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() ?? '';

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json(
      { error: 'Enter a valid GitHub username.' },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json(await getRouteCachedGitHubLanguageAnalysis(username, 'json'), {
      headers: {
        'Cache-Control': ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE
          ? `public, s-maxage=${GITHUB_CACHE_SECONDS}, stale-while-revalidate=${GITHUB_CACHE_SECONDS}`
          : 'no-store',
      },
    });
  } catch (error) {
    const rateLimit = await getRateLimitStatus();

    if (error instanceof Error && error.message === 'GITHUB_USER_NOT_FOUND') {
      return NextResponse.json({ error: 'GitHub account not found.', rateLimit }, { status: 404 });
    }

    if (error instanceof Error && error.message === 'GITHUB_RATE_LIMIT') {
      return NextResponse.json(
        { error: 'GitHub API rate limit reached. Try again later.', rateLimit },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Could not load GitHub language data. Try again.', rateLimit },
      { status: 502 }
    );
  }
}
