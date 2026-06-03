import {
  analyzeGitHubLanguages,
  ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
  GITHUB_CACHE_SECONDS,
  type LanguageAnalysis,
} from '@/lib/github-languages';

type RouteCacheSource = 'json' | 'svg';

interface RouteCacheEntry {
  analysis: LanguageAnalysis;
  expiresAt: number;
}

const routeCache = new Map<string, RouteCacheEntry>();

export function getGitHubLanguageRouteCacheHeaders(contentType?: string) {
  if (!ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE) {
    return {
      ...(contentType ? { 'Content-Type': contentType } : {}),
      'Cache-Control': 'no-store',
    };
  }

  const cdnCacheControl = `public, s-maxage=${GITHUB_CACHE_SECONDS}, stale-while-revalidate=${GITHUB_CACHE_SECONDS}`;

  return {
    ...(contentType ? { 'Content-Type': contentType } : {}),
    'Cache-Control': 'public, max-age=0',
    'CDN-Cache-Control': cdnCacheControl,
    'Vercel-CDN-Cache-Control': cdnCacheControl,
  };
}

export function getCanonicalGitHubUsername(username: string) {
  return username.toLowerCase();
}

export async function getRouteCachedGitHubLanguageAnalysis(
  username: string,
  source: RouteCacheSource
) {
  const cacheKey = getCanonicalGitHubUsername(username);
  const now = Date.now();
  const cached = routeCache.get(cacheKey);

  if (ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE && cached && cached.expiresAt > now) {
    console.info('[github-language-analyzer] route cache hit', {
      username,
      source,
      expiresInMs: cached.expiresAt - now,
    });

    return cached.analysis;
  }

  if (cached) {
    routeCache.delete(cacheKey);
  }

  console.info('[github-language-analyzer] route cache miss', {
    username,
    source,
    routeCacheEnabled: ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
  });

  const analysis = await analyzeGitHubLanguages(username, { source });

  if (ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE) {
    routeCache.set(cacheKey, {
      analysis,
      expiresAt: now + GITHUB_CACHE_SECONDS * 1000,
    });
  }

  return analysis;
}
