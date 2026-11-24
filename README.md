# Sam Shoyer Music

Website for Sam Shoyer: multi-instrumentalist, live-loop performer and music teacher in Silver Plume,
Colorado. Next.js 16, Tailwind v4, pnpm, Vercel. Read `CLAUDE.md` first.

```bash
pnpm install
pnpm dev                      # http://localhost:3000
pnpm lint && pnpm build
node scripts/posters.mjs      # video posters from YouTube -> public/video
pnpm photos                   # photos listed in scripts/photos.json -> public/photos
# gates, against `pnpm start -p 3100`:
node scripts/shoot.mjs <label>   # screenshots at 390 and 1440 -> docs/review/
node scripts/check.mjs           # behaviour: videos, booking form, menu, 404
node scripts/a11y.mjs            # axe WCAG 2.1 AA, touch targets, 200% zoom, focus
```

Booking form email: set `RESEND_API_KEY` and `BOOKING_TO` (optional `BOOKING_FROM`) in Vercel.
Without them the form hands visitors a filled-in email to Sam instead.

Design: `.ulpi/design/DESIGN.md` (locked) and `.ulpi/design/site.md` (spec). Research:
`docs/research/`, reference board: `docs/inspo/`, scores: `docs/review/2026-11-24-score.md`.
