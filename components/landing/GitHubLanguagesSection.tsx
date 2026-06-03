'use client';

import { FormEvent, useEffect, useState } from 'react';
import { BarChart3, CircleGauge, Copy, Github, LoaderCircle, Search } from 'lucide-react';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import languageColors from '@/lib/language-colors.json';

interface LanguageStat {
  name: string;
  percentage: number;
}

interface LanguageResponse {
  username: string;
  repositoriesAnalyzed: number;
  languages: LanguageStat[];
  cacheEnabled: boolean;
  cachedAt: number;
  revalidatesAt: number;
}

interface RateLimit {
  limit: number;
  used: number;
  remaining: number;
  reset: number;
}

const LANGUAGE_COLORS: Record<string, string> = languageColors;

export function GitHubLanguagesSection() {
  const [username, setUsername] = useState('Mutiur03');
  const [result, setResult] = useState<LanguageResponse | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  async function refreshRateLimit() {
    const response = await fetch('/api/github-rate-limit', { cache: 'no-store' });
    setRateLimit(response.ok ? await response.json() : null);
  }

  async function analyzeLanguages(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUsername = username.trim().toLowerCase();

    if (!trimmedUsername) {
      setError('Enter a GitHub username.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/github-languages?username=${encodeURIComponent(trimmedUsername)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Could not load GitHub language data.');
      }

      setResult(data);
      // await refreshRateLimit();
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Could not load GitHub language data.');
    } finally {
      setIsLoading(false);
    }
  }

  const svgUrl = result
    ? `${origin}/api/github-languages/svg?username=${encodeURIComponent(result.username)}`
    : '';
  const markdown = `![GitHub Top Languages](${svgUrl})`;

  return (
    <section className="bg-background py-16 md:py-20">
      <Container>
        <AnimatedElement>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium">
              <Github className="h-4 w-4 text-accent" />
              GitHub Language Analyzer
            </div>
            <h2 className="mb-4 text-3xl font-bold !text-primary md:text-4xl">
              See Any GitHub Account&apos;s Language Mix
            </h2>
            <p className="text-lg text-foreground/80">
              Analyze public, original repositories and see language usage percentages based on GitHub&apos;s code-byte data.
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={100}>
          <Card className="mx-auto mt-10 max-w-3xl shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={analyzeLanguages} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="GitHub username"
                  aria-label="GitHub username"
                  autoComplete="off"
                  className="h-11"
                />
                <Button type="submit" disabled={isLoading} className="h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                  {isLoading ? <LoaderCircle className="animate-spin" /> : <Search />}
                  {isLoading ? 'Analyzing...' : 'Analyze'}
                </Button>
              </form>

              {error && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {error}
                </p>
              )}

              {/* {rateLimit && (
                <div className={`mt-4 flex flex-col gap-1 rounded-lg border px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between ${
                  rateLimit.remaining === 0
                    ? 'border-destructive/40 bg-destructive/10 text-destructive'
                    : 'border-border bg-secondary/50 text-muted-foreground'
                }`}>
                  <span className="flex items-center gap-2 font-medium">
                    <CircleGauge className="h-4 w-4" />
                    GitHub API quota: {rateLimit.remaining} remaining / {rateLimit.limit} ({rateLimit.used} used)
                  </span>
                  <span>
                    Resets at {new Date(rateLimit.reset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )} */}

              {result && (
                <div className="mt-8">
                  <div className="mb-6 flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Language breakdown for</p>
                      <a
                        href={`https://github.com/${result.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-accent hover:underline"
                      >
                        @{result.username}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BarChart3 className="h-4 w-4 text-accent" />
                      {result.repositoriesAnalyzed} public original repositories analyzed
                    </div>
                  </div>
                  {result.cacheEnabled && Number.isFinite(result.revalidatesAt) && (
                    <p className="mb-6 text-sm text-muted-foreground">
                      API route cache refreshes after {new Date(result.revalidatesAt)
                        .toLocaleString("en-GB")
                        .replace(/\//g, "-")}.                    </p>
                  )}
                  {!result.cacheEnabled && (
                    <p className="mb-6 text-sm text-muted-foreground">
                      API route cache disabled. Showing fresh GitHub data.
                    </p>
                  )}

                  {result.languages.length > 0 ? (
                    <>
                      <div className="space-y-5">
                        {result.languages.map((language) => (
                          <div key={language.name}>
                            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                              <span className="font-medium">{language.name}</span>
                              <span className="text-muted-foreground">{language.percentage.toFixed(2)}%</span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${language.percentage}%`,
                                  backgroundColor: LANGUAGE_COLORS[language.name] ?? '#58a6ff',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 border-t border-border pt-6">
                        <h3 className="mb-3 font-semibold text-primary">README SVG</h3>
                        <img
                          src={svgUrl}
                          alt={`${result.username} GitHub top languages`}
                          width="300"
                          height="165"
                          className="w-full max-w-[300px]"
                          // onLoad={refreshRateLimit}
                        />
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <Input value={markdown} readOnly aria-label="README Markdown" />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(markdown)}
                          >
                            <Copy className="h-4 w-4" />
                            Copy Markdown
                          </Button>
                        </div>
                        <a
                          href={svgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block text-sm text-accent hover:underline"
                        >
                          Open SVG directly
                        </a>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No language data found in public, original repositories.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedElement>

        <AnimatedElement delay={200}>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-primary">GitHub language stats for any public profile</h2>
              <p className="text-foreground/80">
                Enter a GitHub username to analyze public, original repositories and see a language breakdown based on GitHub code-byte data.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-primary">How language percentages work</h3>
              <p className="text-foreground/80">
                The analyzer adds language bytes from each non-fork repository, sorts languages by total usage, and converts them into percentages.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-semibold text-primary">README-ready SVG card</h3>
              <p className="text-foreground/80">
                After analysis, copy the Markdown snippet to embed a live GitHub top languages card in your profile README or project documentation.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </Container>
    </section>
  );
}
