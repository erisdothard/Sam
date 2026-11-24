import { cacheLife } from 'next/cache';
import { shows, type Show } from '@/content/shows';

const TZ = 'America/Denver';

/** Today's date in Mountain time as YYYY-MM-DD. */
function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function lastDay(s: Show): string {
  if (!s.monthOnly) return s.date;
  const [y, m] = s.date.split('-').map(Number);
  const end = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return `${s.date.slice(0, 8)}${String(end).padStart(2, '0')}`;
}

/** Upcoming (soonest first) and past (latest first). Recomputed hourly, so a show moves to past
 *  the day after it without a redeploy. */
export async function splitShows(): Promise<{ upcoming: Show[]; past: Show[] }> {
  'use cache';
  cacheLife('hours');
  const now = today();
  const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date));
  return {
    upcoming: sorted.filter((s) => lastDay(s) >= now),
    past: sorted.filter((s) => lastDay(s) < now).reverse(),
  };
}

export function showDate(s: Show) {
  const [y, m, d] = s.date.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const monthLong = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const weekday = date.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' });
  return {
    month: s.monthOnly ? monthLong : month,
    day: s.monthOnly ? null : String(d),
    year: String(y),
    weekday: s.monthOnly ? null : weekday,
    long: s.monthOnly ? `${monthLong} ${y}` : `${weekday}, ${monthLong} ${d}, ${y}`,
  };
}
