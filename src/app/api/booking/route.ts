// Booking form delivery. Sends through Resend when RESEND_API_KEY and BOOKING_TO are set in Vercel.
// Without them it answers 501 and the page hands the message to the visitor's email app instead.

const FIELDS = ['name', 'email', 'type', 'occasion', 'date', 'where', 'details'] as const;
const clean = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 });
  }
  if (clean(body.website)) return Response.json({ ok: true }); // honeypot

  const data = Object.fromEntries(FIELDS.map((k) => [k, clean(body[k])])) as Record<(typeof FIELDS)[number], string>;
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !data.type) {
    return Response.json({ error: 'name, email and type are required' }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO;
  if (!key || !to) return Response.json({ error: 'mail not configured' }, { status: 501 });

  const text = FIELDS.filter((k) => data[k]).map((k) => `${k[0].toUpperCase()}${k.slice(1)}: ${data[k]}`).join('\n');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.BOOKING_FROM ?? 'Sam Shoyer site <onboarding@resend.dev>',
      to: [to],
      reply_to: data.email,
      subject: `Booking: ${data.type}${data.date ? `, ${data.date}` : ''} (${data.name})`,
      text,
    }),
  });
  if (!res.ok) return Response.json({ error: 'send failed' }, { status: 502 });
  return Response.json({ ok: true });
}
