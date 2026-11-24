import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ShowRow } from '@/components/ShowRow';
import { site } from '@/content/site';
import { splitShows } from '@/lib/shows';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Where to hear Sam Shoyer play live in Colorado.',
};

async function Lists() {
  const { upcoming, past } = await splitShows();
  return (
    <>
      {past.length ? (
        <details className="mb-12">
          <summary className="type-log flex min-h-11 cursor-pointer list-none items-center gap-2.5 [&::-webkit-details-marker]:hidden">
            <span className="ring-knob size-4" data-lit="false" aria-hidden />
            <span className="link">Earlier shows ({past.length})</span>
          </summary>
          <ul className="mt-6">
            {[...past].reverse().map((s) => (
              <ShowRow key={s.date + s.venue} show={s} past />
            ))}
          </ul>
        </details>
      ) : null}
      <h2 className="type-log mb-0 flex items-center gap-2.5 pb-3">
        <span className="ring-knob size-4" data-lit={upcoming.length > 0} aria-hidden />
        Coming up
      </h2>
      {upcoming.length ? (
        <ul className="border-b border-ink">
          {upcoming.map((s) => (
            <ShowRow key={s.date + s.venue} show={s} />
          ))}
        </ul>
      ) : (
        <p className="type-title border-y border-ink py-8">
          New dates are on the way. Instagram gets them first:{' '}
          <a href={site.instagram.url} className="link">
            {site.instagram.handle}
          </a>
        </p>
      )}
    </>
  );
}

export default function Shows() {
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-4 pt-12 pb-24 md:px-8 md:pt-20">
      <div className="grid gap-6 md:grid-cols-[5fr_6fr] md:items-end md:gap-16">
        <h1 className="type-display">Live shows</h1>
        <p className="measure">
          Want Sam at your place?{' '}
          <Link href="/booking" className="link">
            Book a show
          </Link>
          .
        </p>
      </div>
      <div className="mt-12 md:mt-16">
        <Suspense fallback={<div className="h-40 border-y border-ink" />}>
          <Lists />
        </Suspense>
      </div>
    </div>
  );
}
