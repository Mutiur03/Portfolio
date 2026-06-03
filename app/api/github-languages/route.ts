import { NextRequest, NextResponse } from 'next/server';
import {
  getRateLimitStatus,
  isValidGitHubUsername,
} from '@/lib/github-languages';
import {
  getCanonicalGitHubUsername,
  getGitHubLanguageRouteCacheHeaders,
  getRouteCachedGitHubLanguageAnalysis,
} from './route-cache';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() ?? '';

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json(
      { error: 'Enter a valid GitHub username.' },
      { status: 400 }
    );
  }

  const canonicalUsername = getCanonicalGitHubUsername(username);

  if (username !== canonicalUsername) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.searchParams.set('username', canonicalUsername);
    return NextResponse.redirect(canonicalUrl, 308);
  }

  try {
    return NextResponse.json(await getRouteCachedGitHubLanguageAnalysis(canonicalUsername, 'json'), {
      headers: getGitHubLanguageRouteCacheHeaders(),
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
