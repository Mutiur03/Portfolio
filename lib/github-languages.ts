export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
}

export interface LanguageAnalysis {
  username: string;
  repositoriesAnalyzed: number;
  totalBytes: number;
  languages: LanguageStat[];
  cacheEnabled: boolean;
  cachedAt: number;
  revalidatesAt: number;
}

interface GitHubRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

interface GitHubRateLimitResponse {
  resources: {
    core: GitHubRateLimit;
    graphql: GitHubRateLimit;
  };
}

interface RateLimitTracker {
  current: GitHubRateLimit | null;
}

interface AnalyzeGitHubLanguagesOptions {
  source?: "json" | "svg";
}

interface GraphQLError {
  message: string;
  type?: string;
  path?: string[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

interface GraphQLUserResponse {
  user: {
    repositories: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
      nodes: Array<{
        name: string;
        languages: {
          edges: Array<{
            size: number;
            node: {
              name: string;
            };
          }>;
        };
      }>;
    };
  } | null;
}

const GITHUB_API_URL = "https://api.github.com";
const USERNAME_PATTERN = /^(?!-)(?!.*--)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
export const GITHUB_CACHE_SECONDS = 60 * 60;
export const ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE = true;

export function isValidGitHubUsername(username: string) {
  return USERNAME_PATTERN.test(username);
}

function getHeaders() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "mutiur-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function trackRateLimit(response: Response, tracker: RateLimitTracker) {
  const limit = Number(response.headers.get("x-ratelimit-limit"));
  const remaining = Number(response.headers.get("x-ratelimit-remaining"));
  const reset = Number(response.headers.get("x-ratelimit-reset"));

  if (
    Number.isFinite(limit) &&
    Number.isFinite(remaining) &&
    Number.isFinite(reset) &&
    (!tracker.current || remaining < tracker.current.remaining)
  ) {
    tracker.current = { limit, remaining, reset };
  }
}

async function fetchGitHubGraphQL<T>(
  query: string,
  variables: Record<string, any>,
  tracker: RateLimitTracker,
): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "mutiur-portfolio",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  trackRateLimit(response, tracker);

  if (!response.ok) {
    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 429
    ) {
      throw new Error("GITHUB_RATE_LIMIT");
    }
    throw new Error("GITHUB_REQUEST_FAILED");
  }

  const result = (await response.json()) as GraphQLResponse<T>;

  if (result.errors && result.errors.length > 0) {
    const isNotFound = result.errors.some(
      (err) =>
        err.type === "NOT_FOUND" ||
        err.message.includes("Could not resolve to a User"),
    );
    if (isNotFound) {
      throw new Error("GITHUB_USER_NOT_FOUND");
    }

    const isRateLimit = result.errors.some(
      (err) => err.message.includes("rate limit") || err.type === "RATE_LIMIT",
    );
    if (isRateLimit) {
      throw new Error("GITHUB_RATE_LIMIT");
    }

    console.error("[github-language-analyzer] GraphQL errors:", result.errors);
    throw new Error("GITHUB_REQUEST_FAILED");
  }

  if (!result.data) {
    throw new Error("GITHUB_REQUEST_FAILED");
  }

  return result.data;
}

export async function getRateLimitStatus() {
  try {
    const response = await fetch(`${GITHUB_API_URL}/rate_limit`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GitHubRateLimitResponse;
    return data.resources.graphql || data.resources.core;
  } catch {
    return null;
  }
}

async function getLanguagesGraphQL(
  username: string,
  tracker: RateLimitTracker,
) {
  const totals = new Map<string, number>();
  let hasNextPage = true;
  let cursor: string | null = null;
  let repositoriesAnalyzed = 0;

  const query = `
    query ($username: String!, $cursor: String) {
      user(login: $username) {
        repositories(
          first: 100
          after: $cursor
          ownerAffiliations: OWNER
          privacy: PUBLIC
          isFork: false
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            languages(first: 100) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  while (hasNextPage) {
    const data = await fetchGitHubGraphQL<GraphQLUserResponse>(
      query,
      { username, cursor },
      tracker,
    );

    if (!data.user) {
      throw new Error("GITHUB_USER_NOT_FOUND");
    }

    const repos = data.user.repositories.nodes;
    repositoriesAnalyzed += repos.length;

    for (const repo of repos) {
      for (const edge of repo.languages.edges) {
        const langName = edge.node.name;
        const bytes = edge.size;
        totals.set(langName, (totals.get(langName) ?? 0) + bytes);
      }
    }

    hasNextPage = data.user.repositories.pageInfo.hasNextPage;
    cursor = data.user.repositories.pageInfo.endCursor;
  }

  return { totals, repositoriesAnalyzed };
}

export async function analyzeGitHubLanguages(
  username: string,
  options: AnalyzeGitHubLanguagesOptions = {},
): Promise<LanguageAnalysis> {
  const startedAt = Date.now();
  const cachedAt = Date.now();
  const tracker: RateLimitTracker = { current: null };

  console.info("[github-language-analyzer] generation started", {
    username,
    source: options.source ?? "json",
    routeCacheEnabled: ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
  });

  try {
    const { totals, repositoriesAnalyzed } = await getLanguagesGraphQL(
      username,
      tracker,
    );
    const totalBytes = Array.from(totals.values()).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );
    const languages: LanguageStat[] = Array.from(totals.entries())
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage:
          totalBytes === 0
            ? 0
            : Number(((bytes / totalBytes) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.bytes - a.bytes);

    console.info("[github-language-analyzer] generation completed", {
      username,
      source: options.source ?? "json",
      repositoriesAnalyzed,
      languagesFound: languages.length,
      totalBytes,
      durationMs: Date.now() - startedAt,
      githubRateLimitRemaining: tracker.current?.remaining ?? null,
    });

    return {
      username,
      repositoriesAnalyzed,
      totalBytes,
      languages,
      cacheEnabled: ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
      cachedAt,
      revalidatesAt: cachedAt + GITHUB_CACHE_SECONDS * 1000,
    };
  } catch (error) {
    console.error("[github-language-analyzer] generation failed", {
      username,
      source: options.source ?? "json",
      durationMs: Date.now() - startedAt,
      githubRateLimitRemaining: tracker.current?.remaining ?? null,
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    });

    throw error;
  }
}
