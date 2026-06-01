import { NextRequest, NextResponse } from 'next/server';

interface GitHubRepository {
  fork: boolean;
  name: string;
  owner: {
    login: string;
  };
}

interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

interface GitHubRateLimitResponse {
  resources: {
    core: GitHubRateLimit;
  };
}

interface RateLimitTracker {
  current: GitHubRateLimit | null;
}

const GITHUB_API_URL = 'https://api.github.com';
const USERNAME_PATTERN = /^(?!-)(?!.*--)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
const BATCH_SIZE = 8;

function getHeaders() {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'mutiur-portfolio',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function trackRateLimit(response: Response, tracker: RateLimitTracker) {
  const limit = Number(response.headers.get('x-ratelimit-limit'));
  const remaining = Number(response.headers.get('x-ratelimit-remaining'));
  const reset = Number(response.headers.get('x-ratelimit-reset'));

  if (
    Number.isFinite(limit) &&
    Number.isFinite(remaining) &&
    Number.isFinite(reset) &&
    (!tracker.current || remaining < tracker.current.remaining)
  ) {
    tracker.current = { limit, remaining, reset };
  }
}

async function fetchGitHub<T>(url: string, tracker: RateLimitTracker): Promise<T> {
  const response = await fetch(url, {
    headers: getHeaders(),
    cache: 'no-store',
  });

  trackRateLimit(response, tracker);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('GITHUB_USER_NOT_FOUND');
    }

    if (response.status === 403 || response.status === 429) {
      throw new Error('GITHUB_RATE_LIMIT');
    }

    throw new Error('GITHUB_REQUEST_FAILED');
  }

  return response.json() as Promise<T>;
}

async function getRateLimitStatus() {
  try {
    const response = await fetch(`${GITHUB_API_URL}/rate_limit`, {
      headers: getHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GitHubRateLimitResponse;
    return data.resources.core;
  } catch {
    return null;
  }
}

async function getRepositories(username: string, tracker: RateLimitTracker) {
  const repositories: GitHubRepository[] = [];
  let page = 1;

  while (true) {
    const pageRepositories = await fetchGitHub<GitHubRepository[]>(
      `${GITHUB_API_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=owner&sort=updated`,
      tracker
    );

    repositories.push(...pageRepositories.filter((repository) => !repository.fork));

    if (pageRepositories.length < 100) {
      return repositories;
    }

    page += 1;
  }
}

async function getLanguageTotals(repositories: GitHubRepository[], tracker: RateLimitTracker) {
  const totals = new Map<string, number>();

  for (let index = 0; index < repositories.length; index += BATCH_SIZE) {
    const batch = repositories.slice(index, index + BATCH_SIZE);
    const responses = await Promise.all(
      batch.map((repository) =>
        fetchGitHub<Record<string, number>>(
          `${GITHUB_API_URL}/repos/${encodeURIComponent(repository.owner.login)}/${encodeURIComponent(repository.name)}/languages`,
          tracker
        )
      )
    );

    responses.forEach((languages) => {
      Object.entries(languages).forEach(([language, bytes]) => {
        totals.set(language, (totals.get(language) ?? 0) + bytes);
      });
    });
  }

  return totals;
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')?.trim() ?? '';

  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json(
      { error: 'Enter a valid GitHub username.' },
      { status: 400 }
    );
  }

  const tracker: RateLimitTracker = { current: null };

  try {
    const repositories = await getRepositories(username, tracker);
    const totals = await getLanguageTotals(repositories, tracker);
    const totalBytes = Array.from(totals.values()).reduce((sum, bytes) => sum + bytes, 0);
    const languages: LanguageStat[] = Array.from(totals.entries())
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: totalBytes === 0 ? 0 : Number(((bytes / totalBytes) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.bytes - a.bytes);

    return NextResponse.json({
      username,
      repositoriesAnalyzed: repositories.length,
      totalBytes,
      languages,
      rateLimit: tracker.current ?? await getRateLimitStatus(),
    });
  } catch (error) {
    const rateLimit = tracker.current ?? await getRateLimitStatus();

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
