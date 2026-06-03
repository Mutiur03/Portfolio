import { NextRequest, NextResponse } from 'next/server';
import {
  ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE,
  GITHUB_CACHE_SECONDS,
  isValidGitHubUsername,
  type LanguageStat,
} from '@/lib/github-languages';
import { getRouteCachedGitHubLanguageAnalysis } from '../route-cache';
import languageColors from '@/lib/language-colors.json';

const WIDTH = 300;
const HEIGHT = 165;
const BAR_WIDTH = 250;
const LANGUAGE_COLORS: Record<string, string> = languageColors;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getColor(language: LanguageStat) {
  return LANGUAGE_COLORS[language.name] ?? '#58a6ff';
}

function renderProgressBar(languages: LanguageStat[]) {
  let x = 0;

  return languages.map((language) => {
    const width = BAR_WIDTH * language.percentage / 100;
    const rect = `<rect x="${x}" y="0" width="${width}" height="8" fill="${getColor(language)}" />`;
    x += width;
    return rect;
  }).join('');
}

function renderLanguageItems(languages: LanguageStat[]) {
  return languages.map((language, index) => {
    const column = index < 3 ? 0 : 1;
    const row = index % 3;
    const x = column * 150;
    const y = row * 25;
    const delay = 450 + row * 150;

    return `
      <g class="stagger" transform="translate(${x}, ${y})" style="animation-delay: ${delay}ms">
        <circle cx="5" cy="6" r="5" fill="${getColor(language)}" />
        <text x="15" y="10" class="lang-name">${escapeXml(language.name)} ${language.percentage.toFixed(2)}%</text>
      </g>
    `;
  }).join('');
}

function renderSvg(username: string, languages: LanguageStat[]) {
  const visibleLanguages = languages.slice(0, 6);

  return `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
      <title>${escapeXml(username)} GitHub top languages</title>
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58A6FF; animation: fadeIn 0.8s ease-in-out forwards; }
        .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #C3D1D9; }
        .stagger { opacity: 0; animation: fadeIn 0.3s ease-in-out forwards; }
        #rect-mask rect { animation: slideIn 1s ease-in-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { width: 0; } to { width: ${BAR_WIDTH}px; } }
      </style>
      <rect x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 2}" rx="4.5" fill="#0D1117" stroke="#e4e2e2" />
      <text x="25" y="35" class="header">Most Used Languages</text>
      <g transform="translate(25, 55)">
        <mask id="rect-mask">
          <rect x="0" y="0" width="${BAR_WIDTH}" height="8" fill="white" rx="5" />
        </mask>
        <g mask="url(#rect-mask)">
          ${renderProgressBar(visibleLanguages)}
        </g>
        <g transform="translate(0, 25)">
          ${renderLanguageItems(visibleLanguages)}
        </g>
      </g>
    </svg>
  `.trim();
}

export async function GET(request: NextRequest) {
  const username =
    request.nextUrl.searchParams.get('username')?.trim() ??
    Array.from(request.nextUrl.searchParams.keys())[0]?.trim() ??
    '';

  if (!isValidGitHubUsername(username)) {
    return NextResponse.json({ error: 'Enter a valid GitHub username.' }, { status: 400 });
  }

  try {
    const analysis = await getRouteCachedGitHubLanguageAnalysis(username, 'svg');
    return new NextResponse(renderSvg(username, analysis.languages), {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': ENABLE_GITHUB_LANGUAGE_ROUTE_CACHE
          ? `public, s-maxage=${GITHUB_CACHE_SECONDS}, stale-while-revalidate=${GITHUB_CACHE_SECONDS}`
          : 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Could not generate language SVG.' }, { status: 502 });
  }
}
