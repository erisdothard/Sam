---
project: Sam Shoyer Music
register: musician / teacher
aesthetic_direction: the studio room in Silver Plume, the loop station's lit track ring, a dated session log
color_strategy: the room's own colours, sampled from Sam's footage; kilim red as the one field
design_system: bespoke
design_variance: 6
motion_intensity: 3
visual_density: 4
---

# Sam Shoyer Music. Design language (LOCKED)

Written 2026-11-24 from Sam's "Website Ideas" doc, his three live-loop Shorts
(`docs/research/sam-2026-11-24.md`) and the reference board (`docs/inspo/README.md`).
Values live in `src/app/globals.css` (`@theme`). This file says why, and where each is allowed.

## Design read

Sam builds songs alone, one looped layer at a time, and teaches the same instruments. The site has
two jobs, weighted equally: get him booked (venues, bars, weddings, events, session work) and get
him students (all ages, Denver to Summit County).

His only public media is three phone videos from the same room: his studio in Silver Plume (his doc: "Studio located in Silver Plume"),
snow in the windows, a red kilim on a pine floor, a sunburst guitar, a gold alto sax, two keyboards
and a loop station whose track knobs glow in green rings. No looper on the reference board shows
the loop being built; Sam's videos are nothing but that. So:

- **The videos are the hero**, played where they sit, in their own 9:16.
- **The room is the palette.** Every colour below was sampled from the footage.
- **The signature is the track ring**: the green LED ring around each track knob on his loop station.
- **The voice is a dated log**, the way he titles his videos ("Live Loop 11/23/26").

## Signature: the track ring

A dark knob with a lit ring, drawn in CSS (`src/components/Ring.tsx`): ink disc, a 2px LED-green ring
inset from its edge, a soft green glow. It is the only glowing thing on the site. States follow the
loop station: **lit** (green ring) = playing / on / upcoming; **dim** (ring at 25%) = off / past.

Where it appears, and nowhere else:
- **Video tiles:** the play control. Dim on the poster; lit while the video plays.
- **Shows:** the marker on each row. Lit for upcoming, dim for past.
- **Booking sets:** one ring per instrument in Sam's rig; the set's instruments are lit.
- **Nav:** a small ring before each page name; the current page's ring is lit.
- **Favicon.**

## Hard exclusions

From the board (every reference lost its first screen to one of these):
- No popups, modals on load, cookie walls, age gates, newsletter interstitials or pre-save prompts.
- No pill buttons, no circular photo crops, no rainbow section fields (the Swallow Hill default).
- No album-campaign styling, no splash page, no "enter site" gate.

General:
- No placeholder content. A section that needs media renders only when the media exists.
- No card grids with rounded corners and shadows. No glass, no gradient text, no gradient washes.
- No fade-and-slide-up on scroll. No marquee. No fake stats. No stock imagery or clip-art instruments.
- No arrows in link text. No em-dashes or exclamation marks in visible copy.
- Never LED green as text on the window ground (2.27:1). Never white text on the window ground.

## Color (locked, sampled 2026-11-24 from the Shorts)

| role | token | hex | sampled from | use |
|---|---|---|---|---|
| ground | `window` | #EEEFEC | snow light through the front windows | page background |
| ink | `ink` | #181614 | the guitar's black edge, the knobs | type, rules, the rig room ground |
| field | `kilim` | #923634 | the red kilim on the floor | the one field per page (next show), small accent text on the ground |
| signal | `led` | #54B449 | the loop station's track rings | the ring only, and short labels on ink |
| deep | `mahogany` | #5F3937 | the synth's wooden end cheeks | secondary type on the ground |
| caption | `pine` | #7B5D40 | the pine drawer under the keys | captions, metadata on the ground |
| paper | `white` | #FFFFFF | | type on ink and on kilim |

Weighting: window ground and video carry about 80% of a page, ink type about 15%, kilim at most one
field per page, LED green only in rings.

### Contrast (WCAG 2.2 AA, measured 2026-11-24)

| text \ ground | window | ink | kilim |
|---|---|---|---|
| ink | 15.63 | n/a | 2.41 (banned) |
| mahogany | 8.55 | 1.83 (banned) | 1.32 (banned) |
| pine | 5.22 | 2.99 (banned) | 1.24 (banned) |
| kilim | 6.50 | 2.41 (banned) | n/a |
| led | 2.27 (banned) | 6.88 | 2.86 (banned) |
| white | 1.15 (banned) | 18.05 | 7.50 |

Rule: on the kilim field, all type is white.

## Type (locked)

Two families, each with one job:
- **Newsreader** (variable, `opsz` 6–72, `wght` 200–800, italic). Sam's voice: his name, headings,
  his bio, every sentence. A warm, bookish serif, because his doc reads like a letter, not a press kit.
- **Martian Mono** (variable, `wdth` 75–112.5). The log: dates, times, prices, instrument lists,
  video titles. Used at small sizes only, set condensed (`wdth` 87.5), like the labels on his gear and
  the date stamps in his video titles.

| role | settings | use |
|---|---|---|
| name | Newsreader, opsz 72, wght 500, tracking -0.03em, line-height 0.88 | SAM SHOYER in the hero, sentence case "Sam Shoyer" |
| display | Newsreader, opsz 72, wght 400, line-height 0.98, italic allowed for one word | page and section titles |
| title | Newsreader, opsz 36, wght 500, line-height 1.12 | sub-titles, set names, venue names |
| body | Newsreader, opsz 16, wght 400, 18–20px, line-height 1.55, measure ≤ 62ch | reading copy |
| log | Martian Mono, wdth 87.5, wght 400, 12–13px, tracking 0.02em, uppercase | dates, times, prices, instrument names, video titles, nav |

Sizes: log 0.8125rem; body clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem);
title clamp(1.5rem, 1.2rem + 1vw, 2rem); display clamp(3rem, 1.8rem + 5vw, 7rem).

## Scales (locked)

- **Spacing:** 4px base. Section rhythm 96 / 144.
- **Content max width:** 1280px, 16px gutter on phones, 32px from `md`.
- **Radius:** 0. Rings are the only circles.
- **Shadow:** none, except the ring's LED glow.
- **Rules:** 1px ink.
- **Motion:** 160 ms `cubic-bezier(0.2, 0, 0, 1)` for UI. A ring lights in 120 ms. Nothing moves on
  its own; video plays only when asked.

## Layout vocabulary

1. **Hero (home).** From `md`: the name and tagline at left with the two doors under it; at right the
   three Shorts in a row at 9:16, each captioned with Sam's own title (dated only when his title is not). On phones:
   name, tagline, doors, then the Shorts in a horizontal snap row, each 72vw wide.
2. **Video tile.** Poster (YouTube's own 1080x1920 poster for that Short, stored at 720x1280), the
   ring bottom-left, title and date under it. Click: the poster is replaced by the YouTube
   (no-cookie) player, playing, in the same box. Only one plays at a time.
3. **Next show.** The kilim field: the log date, venue, town, time. White type.
4. **Two doors.** Play and Teach, equal halves, a display word, one sentence, one link.
5. **The rig room.** The one ink section per page: booking sets with their rings, lesson rates.
6. **Liner notes.** Credits set like an album's liner notes: name, role, place, years.
7. **Footer.** Window ground, links in Sam's voice, one ring.

Nav: "Sam Shoyer" in Newsreader at left; Shows, Lessons, Booking, About, Media in the log face at
right. Phones: name plus a Menu button opening a full-screen ink panel.

## Voice

Sam's own words from his doc wherever they exist. Plain, warm, first-hand. Verbs first on actions:
"Book a show", "Book lessons", "Send it". All copy lives in `src/content/site.ts`; anything Sam has not
confirmed carries `TODO(confirm)`.

## Review against the generic defaults (before any code, 2026-11-24)

| first instinct | why it is generic | now |
|---|---|---|
| A big hero photo of the musician with a gradient scrim and centred CTA | the default artist template (Tash, Tunstall); and Sam has no hero photo | his three live-loop videos, in a row, at their real 9:16, played in place |
| Dark, moody "live music" background | every music site on the board | snow window light, the colour of his actual room |
| Sax-gold or neon accent picked by feel | invented palette | every colour sampled from his footage; the accent is the kilim on his floor |
| One geometric sans (Inter, Instrument Sans) for everything | stock reflex | a warm serif for his voice, a condensed mono for the log, each with one job |
| A sequencer grid or waveform as decoration (v1 of this site) | an idea about looping, not Sam's looping | the actual lit track ring from his loop station, used as a working control |
| Rounded lesson cards with icons, pill buttons | Swallow Hill / School of Rock default | a rate sheet on ink and a plain list of instruments |
| Instagram feed embed | heavy, breaks, shows whatever was posted last | a link, plus a contact sheet once real photos are supplied |
| Newsletter popup, cookie banner | every reference | none; no tracking, nothing to consent to |
