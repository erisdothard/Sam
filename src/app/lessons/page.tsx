import type { Metadata } from 'next';
import Link from 'next/link';
import { lessons } from '@/content/site';

export const metadata: Metadata = {
  title: 'Lessons',
  description:
    'Saxophone, guitar, bass, keyboard, synth, production and looping lessons with Sam Shoyer in Silver Plume, serving Denver, Golden, Evergreen, Clear Creek and Summit County.',
};

export default function Lessons() {
  return (
    <>
      <div className="mx-auto max-w-[var(--container-content)] px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
        <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:items-end md:gap-16">
          <h1 className="type-display">{lessons.title}</h1>
          <p className="type-title !font-normal">{lessons.lead}</p>
        </div>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[5fr_7fr] md:gap-16">
          <section aria-labelledby="where">
            <h2 id="where" className="type-title">
              {lessons.where.title}
            </h2>
            <p className="mt-4">{lessons.where.studio}</p>
            <p className="mt-4 text-mahogany">{lessons.where.areasLead}</p>
            <ul className="mt-3 border-b border-ink">
              {lessons.where.areas.map((a) => (
                <li key={a} className="type-title !font-normal border-t border-ink py-3">
                  {a}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="what">
            <h2 id="what" className="type-title">
              {lessons.what.title}
            </h2>
            <ul className="mt-4 border-b border-ink">
              {lessons.what.instruments.map((x) => (
                <li key={x} className="type-title !font-normal border-t border-ink py-3">
                  {x}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* The rig room: the rate sheet. */}
      <section aria-labelledby="rates" className="on-ink bg-ink text-white">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 py-16 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8 md:py-24">
          <h2 id="rates" className="type-display">
            {lessons.rates.title}
          </h2>
          <table className="w-full border-b border-white/25 text-left">
            <thead className="sr-only">
              <tr>
                <th>Lesson</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {lessons.rates.rows.map((r) => (
                <tr key={r.what + r.length} className="border-t border-white/25">
                  <td className="py-6 pr-4 align-middle">
                    <span className="type-title block">{r.what}</span>
                    <span className="type-log mt-2 block text-white/75">{r.length}</span>
                  </td>
                  <td className="py-6 text-right align-middle">
                    <span className="type-display block !text-[clamp(2.75rem,6vw,4.5rem)]">{r.price.split(' ')[0]}</span>
                    {r.price.includes(' ') ? <span className="type-log mt-1 block text-led">{r.price.split(' ').slice(1).join(' ')}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto grid max-w-[var(--container-content)] gap-6 px-4 py-16 md:grid-cols-[5fr_7fr] md:items-end md:gap-16 md:px-8 md:py-24">
        <h2 className="type-display">{lessons.cta.title}</h2>
        <div>
          <p className="measure">{lessons.cta.body}</p>
          <Link href={lessons.cta.href} className="btn mt-6">
            {lessons.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}
