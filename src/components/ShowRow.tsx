import type { Show } from '@/content/shows';
import { showDate } from '@/lib/shows';

// One show in the log: lit ring if it is coming up, the date in the log face, then where.
export function ShowRow({ show, past = false }: { show: Show; past?: boolean }) {
  const d = showDate(show);
  return (
    <li className="grid grid-cols-[1.5rem_1fr] gap-x-4 gap-y-2 border-t border-ink py-7 md:grid-cols-[1.5rem_13rem_1fr] md:gap-x-8">
      <span className="ring-knob mt-0.5 size-5" data-lit={!past} aria-hidden />
      <p className={`type-log ${past ? 'text-pine' : ''}`}>
        <time dateTime={show.date}>{d.long}</time>
        {show.time ? <span className="block">{show.time}</span> : null}
      </p>
      <div className="col-start-2 md:col-start-3">
        <p className={`type-title ${past ? 'text-mahogany' : ''}`}>{show.venue}</p>
        <p className="mt-1">{show.town}</p>
        {show.note ? <p className="mt-2 text-mahogany">{show.note}</p> : null}
        {show.link ? (
          <a href={show.link} className="link mt-2 inline-block">
            Details
          </a>
        ) : null}
      </div>
    </li>
  );
}
