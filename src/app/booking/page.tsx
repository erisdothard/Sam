import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BookingForm } from '@/components/BookingForm';
import { booking, rig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Book Sam Shoyer for a venue, bar, wedding or event: a full live-looped set, jazz standards, an acoustic set or a dance set.',
};

export default function Booking() {
  return (
    <>
      <div className="mx-auto max-w-[var(--container-content)] px-4 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24">
        <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:items-end md:gap-16">
          <h1 className="type-display">{booking.title}</h1>
          <div>
            <p className="measure md:text-[1.375rem] md:leading-[1.5]">{booking.lead}</p>
            <a href="#form" className="btn mt-8">
              {booking.availability}
            </a>
          </div>
        </div>
      </div>

      {/* The rig room: the one ink section on this page. Each set lights the rings of what it uses. */}
      <section aria-labelledby="sets" className="on-ink bg-ink text-white">
        <div className="mx-auto max-w-[var(--container-content)] px-4 py-16 md:px-8 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="sets" className="type-display">
              {booking.setsTitle}
            </h2>
            <p className="type-log max-w-[36ch] text-white/75">Lit rings show what is in each set.</p>
          </div>
          <ol className="mt-10 border-b border-white/25 md:mt-14">
            {booking.sets.map((s) => (
              <li key={s.id} className="grid gap-6 border-t border-white/25 py-8 md:grid-cols-[5fr_7fr] md:gap-16 md:py-10">
                <div>
                  <h3 className="type-title">{s.name}</h3>
                  <p className="mt-3 measure text-white/85">{s.body}</p>
                </div>
                <ul className="grid grid-cols-3 gap-x-4 gap-y-4 self-center sm:grid-cols-6" aria-label={`${s.name}: ${s.parts.join(', ')}`}>
                  {rig.map((part) => {
                    const on = (s.parts as readonly string[]).includes(part);
                    return (
                      <li key={part} className="flex flex-col items-start gap-2" aria-hidden>
                        <span className={`ring-knob size-10 ${on ? '' : 'opacity-50'}`} data-lit={on} />
                        <span className={`type-log ${on ? 'text-led' : 'text-white/60 line-through decoration-white/40'}`}>{part}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-[var(--container-content)] gap-x-16 px-4 py-16 md:grid-flow-col md:grid-cols-2 md:grid-rows-[auto_auto] md:px-8 md:py-24">
        <div>
          <h2 className="type-title">{booking.hire.title}</h2>
          <p className="mt-3">{booking.hire.body}</p>
        </div>
        <ul className="mt-6 border-b border-ink">
          {booking.hire.instruments.map((x) => (
            <li key={x} className="type-title !font-normal border-t border-ink py-3">
              {x}
            </li>
          ))}
        </ul>
        <div className="mt-12 md:mt-0">
          <h2 className="type-title">{booking.for.title}</h2>
          <p className="mt-3">{booking.for.body}</p>
        </div>
        <ul className="mt-6 self-start border-b border-ink">
          {booking.for.items.map((x) => (
            <li key={x} className="type-title !font-normal border-t border-ink py-3">
              {x}
            </li>
          ))}
        </ul>
      </section>

      <section id="form" aria-labelledby="form-title" className="border-t border-ink">
        <div className="mx-auto grid max-w-[var(--container-content)] gap-10 px-4 py-16 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8 md:py-24">
          <div>
            <h2 id="form-title" className="type-display">
              {booking.form.title}
            </h2>
            <p className="mt-6 measure">{booking.form.lead}</p>
          </div>
          <Suspense>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
