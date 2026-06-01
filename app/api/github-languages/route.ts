import { NextRequest, NextResponse } from 'next/server';
import {
  analyzeGitHubLanguages,
  getRateLimitStatus,
  isValidGitHubUsername,
} from '@/lib/github-languages';

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() ?? '';

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json(
      { error: 'Enter a valid GitHub username.' },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json(await analyzeGitHubLanguages(username));
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
