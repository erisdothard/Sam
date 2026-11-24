import Link from 'next/link';
import { home, site } from '@/content/site';
import { showDate, splitShows } from '@/lib/shows';

// The one kilim field on the home page.
export async function NextShow() {
  const { upcoming } = await splitShows();
  const next = upcoming[0];
  const d = next ? showDate(next) : null;
  return (
    <section aria-labelledby="next-show" className="on-kilim bg-kilim text-white">
      <div className="mx-auto grid max-w-[var(--container-content)] gap-8 px-4 py-14 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8 md:py-20">
        <div className="flex flex-col justify-between gap-6">
          <h2 id="next-show" className="type-log flex items-center gap-2.5">
            <span className="ring-knob size-4" data-lit={Boolean(next)} aria-hidden />
            {home.nextShow.title}
          </h2>
          <Link href="/shows" className="type-log link hidden min-h-11 items-center self-start md:inline-flex">
            {home.nextShow.all}
          </Link>
        </div>
        {next && d ? (
          <div>
            <p className="type-log">{d.long}</p>
            <p className="type-display mt-3">{next.venue}</p>
            <p className="type-title mt-4 !font-normal">
              {next.town}
              {next.time ? `, ${next.time}` : ''}
            </p>
            {next.note ? <p className="mt-3 measure">{next.note}</p> : null}
            <Link href="/shows" className="type-log link mt-6 inline-flex min-h-11 items-center md:hidden">
              {home.nextShow.all}
            </Link>
          </div>
        ) : (
          <p className="type-title">
            {home.nextShow.none}{' '}
            <a href={site.instagram.url} className="link">
              {site.instagram.handle}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
