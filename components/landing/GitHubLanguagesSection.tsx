'use client';

import { FormEvent, useState } from 'react';
import { BarChart3, CircleGauge, Github, LoaderCircle, Search } from 'lucide-react';
import { AnimatedElement } from '@/components/shared/AnimatedElement';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface LanguageStat {
  name: string;
  percentage: number;
}

interface LanguageResponse {
  username: string;
  repositoriesAnalyzed: number;
  languages: LanguageStat[];
  rateLimit: RateLimit | null;
}

interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

const languageColors = [
  'bg-accent',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
  'bg-primary',
];

export function GitHubLanguagesSection() {
  const [username, setUsername] = useState('Mutiur03');
  const [result, setResult] = useState<LanguageResponse | null>(null);
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function analyzeLanguages(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError('Enter a GitHub username.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/github-languages?username=${encodeURIComponent(trimmedUsername)}`, {
        cache: 'no-store',
      });
      const data = await response.json();
      setRateLimit(data.rateLimit ?? null);

      if (!response.ok) {
        throw new Error(data.error ?? 'Could not load GitHub language data.');
      }

      setResult(data);
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Could not load GitHub language data.');
    } finally {
      setIsLoading(false);
    }
  }

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

              {rateLimit && (
                <div className={`mt-4 flex flex-col gap-1 rounded-lg border px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between ${
                  rateLimit.remaining === 0
                    ? 'border-destructive/40 bg-destructive/10 text-destructive'
                    : 'border-border bg-secondary/50 text-muted-foreground'
                }`}>
                  <span className="flex items-center gap-2 font-medium">
                    <CircleGauge className="h-4 w-4" />
                    GitHub API calls left: {rateLimit.remaining} / {rateLimit.limit}
                  </span>
                  <span>
                    Resets at {new Date(rateLimit.reset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )}

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

                  {result.languages.length > 0 ? (
                    <div className="space-y-5">
                      {result.languages.map((language, index) => (
                        <div key={language.name}>
                          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                            <span className="font-medium">{language.name}</span>
                            <span className="text-muted-foreground">{language.percentage.toFixed(2)}%</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full rounded-full ${languageColors[index % languageColors.length]}`}
                              style={{ width: `${language.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
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
      </Container>
    </section>
  );
}
