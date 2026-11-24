'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { booking, site } from '@/content/site';

type State = 'idle' | 'sending' | 'sent' | 'failed';

function mailto(data: Record<string, string>) {
  const body = Object.entries(data)
    .filter(([k, v]) => v && k !== 'website')
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`)
    .join('\n');
  return `mailto:${site.email}?subject=${encodeURIComponent(`Booking: ${data.type || 'inquiry'}`)}&body=${encodeURIComponent(body)}`;
}

export function BookingForm() {
  const params = useSearchParams();
  const preset = params.get('type') ?? '';
  const [state, setState] = useState<State>('idle');
  const [fallback, setFallback] = useState<string | null>(null);
  const f = booking.form;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState('sending');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      form.reset();
    } catch {
      // No mail service configured, or it failed: hand the same message to the visitor's email app.
      // A visible link as well, for visitors with no default mail app.
      const href = mailto(data);
      setFallback(href);
      setState('failed');
      window.location.href = href;
    }
  }

  const label = 'type-log grid gap-2';

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className={label}>
          Name
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
        <label className={label}>
          What you are after
          <select name="type" required defaultValue={f.types.includes(preset as never) ? preset : ''} className="field">
            <option value="" disabled>
              Choose one
            </option>
            {f.types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          The occasion
          <select name="occasion" defaultValue={preset === 'Lessons' ? 'Lessons' : ''} className="field">
            <option value="">Choose one</option>
            {f.events.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Date
          <input name="date" type="date" className="field" />
        </label>
        <label className={label}>
          Where
          <input name="where" placeholder="Venue and town" className="field" />
        </label>
      </div>
      <label className={label}>
        Anything else
        <textarea name="details" rows={4} placeholder="Times, set length, budget, or what you want to learn" className="field" />
      </label>
      {/* Honeypot: people never see it, bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn" disabled={state === 'sending'}>
          {state === 'sending' ? f.sending : f.submit}
        </button>
        <p role="status" className="type-log">
          {state === 'sent' ? f.sent : null}
          {state === 'failed' && fallback ? (
            <>
              {f.failed}{' '}
              <a href={fallback} className="link text-kilim">
                {f.openEmail}
              </a>
            </>
          ) : null}
        </p>
      </div>
      <p className="text-mahogany">
        Or email{' '}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
        .
      </p>
    </form>
  );
}
