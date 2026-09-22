import { NextResponse } from 'next/server';
import { getTechNews } from '@/lib/techNews';

// Cache this route's response for an hour. Visitors never trigger a
// live fetch to TechCrunch/The Verge/etc. themselves — the first
// request after the hour is up refreshes it, everyone else gets the
// cached result. That's what makes this "automatic": nobody has to
// remember to update anything, and it doesn't hammer the source sites.
export const revalidate = 3600;

export async function GET() {
  try {
    const items = await getTechNews(10);
    return NextResponse.json({ items });
  } catch (err) {
    console.error('[api/tech-news] aggregation failed:', err);
    // Fail soft — an empty list lets the widget hide itself gracefully
    // instead of the whole page erroring out.
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
