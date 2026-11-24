# Sam Shoyer Music

Website for Sam Shoyer: multi-instrumentalist, live-loop performer and music teacher in Silver Plume,
Colorado. Client of Eris (Syntra AI). Next.js 16 App Router, Tailwind v4, pnpm, deployed on Vercel.

Read before UI work:
- `.ulpi/design/DESIGN.md`: the locked design language. Every colour, font, size and duration comes from it.
- `.ulpi/design/site.md`: the feature spec, content facts and what is still TODO(confirm).
- `AGENTS.md`: this Next.js version differs from training data. Read `node_modules/next/dist/docs/` first.

The brief is Sam's Google Doc "Website Ideas" (id 1vlS2Q98hhpG7ZbJZ0jL4DSMRJ-keAKlK-KvJLWKnoE8). It is
complete. If a build scores badly against it, the build is wrong.

## Commands
```bash
pnpm dev                  # http://localhost:3000
pnpm lint && pnpm build
pnpm photos               # scripts/photos.json -> public/photos + src/content/photos.ts
pnpm build && pnpm start -p 3100 &   # then the gates:
node scripts/shoot.mjs <label>   # 390 + 1440 screenshots -> docs/review/
node scripts/check.mjs           # behaviour: videos, form, menu, 404
node scripts/a11y.mjs            # axe WCAG 2.1 AA, targets, zoom, focus
node scripts/posters.mjs         # video posters -> public/video
```

## Rules
- All copy lives in `src/content/site.ts`; shows live in `src/content/shows.ts`. Unconfirmed facts carry `TODO(confirm)`.
- Gates: every UI change gets 390px and 1440px captures in `docs/review/`, and check.mjs + a11y.mjs pass, before it is called done.
- Video posters are YouTube's own posters for Sam's Shorts; use each only as the poster of its own video.
- No placeholder content of any kind. A section that needs media renders only when the media exists.
- Never commit original photos. `assets-src/` and `.cache/` are git-ignored.
- Booking form email: set `RESEND_API_KEY` and `BOOKING_TO` in Vercel. Without them the form falls back to a prefilled email.
- No Co-Authored-By trailers.
