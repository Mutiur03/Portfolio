import { NextResponse } from 'next/server';
import { getRateLimitStatus } from '@/lib/github-languages';

function formatResetTime(reset: number) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Dhaka',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).formatToParts(new Date(reset * 1000));
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${values.day}-${values.month}-${values.year}, ${values.hour}:${values.minute}:${values.second} ${values.dayPeriod} Asia/Dhaka (UTC+06:00)`;
}

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

  return NextResponse.json(
    {
      ...rateLimit,
      reset: formatResetTime(rateLimit.reset),
    },
    responseOptions
  );
}
