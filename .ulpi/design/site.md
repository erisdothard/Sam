# Sam Shoyer Music. Feature spec v1

Source: Sam's Google Doc "Website Ideas" (sam.shoyer@gmail.com, shared with Eris 2026-11-24,
doc id 1vlS2Q98hhpG7ZbJZ0jL4DSMRJ-keAKlK-KvJLWKnoE8). The doc is the brief. Its page list is the
route list.

## Routes

| route | job | sections in order |
|---|---|---|
| `/` | Show who Sam is, send people to play or teach | hero (name, tagline, two doors, the three live-loop Shorts), next show (kilim field), Play / Teach, short about, footer |
| `/shows` | Where to see him | upcoming shows, past shows behind a disclosure (the doc: "ability to scroll up to past shows") |
| `/booking` | Get booked | four sets each with its instrument rings (the rig room), hire as a player, who it is for, the booking form with availability |
| `/lessons` | Get students | where (areas, Silver Plume studio), what (instruments), rate sheet (the rig room), all ages and levels, book lessons |
| `/about` | Trust | bio (Sam's three paragraphs), liner-note credits |
| `/media` | Watch and follow | every live-loop video, Instagram and YouTube; contact sheet of photos once they exist |
| `/api/booking` | Deliver the form | POST JSON; sends with Resend when `RESEND_API_KEY` and `BOOKING_TO` are set, otherwise 501 and the page falls back to a prefilled email |
| `not-found` | Recover | one dim ring, link home |

## Content facts (all from Sam's doc unless noted)

- Tagline: "Multi-instrumentalist, live-loop performer, and music teacher in the Colorado mountains."
- Shows: Nov 14 (2026), 5–8pm, Cabin Creek Brewing, Georgetown CO. January (2027), Historic
  Schoolhouse, musical director of the play. The credits list "Musical Director, Snow White British
  Pantomime Comedy, Georgetown, CO [2027]", taken to be the same thing. TODO(confirm) the dates.
- Sets: Full Live Set; Jazz Standards; Acoustic Set; DJ Style Dance Set. The Acoustic Set line in the
  doc is cut off mid-sentence ("can optionally"). TODO(confirm) the rest.
- Hire: live and session player on alto sax, guitar, bass, keys, synth, vocals. For venues, bars,
  weddings, events. "Click here for booking availability": TODO(confirm) whether Sam keeps a
  calendar to link; until then the form asks for the date.
- Lessons: Denver, Golden, Evergreen, Clear Creek County, Summit County. Studio in Silver Plume.
  Sax, guitar, bass, keys, synth, band/group, music production (Pro Tools, Logic), drum
  machine/looping. All ages, all levels. $35 per half hour, $60 per hour, groups of 3–8 at $20 per
  student per hour.
- Bio and credits: verbatim from the doc.
- Contact: the doc is owned by sam.shoyer@gmail.com. TODO(confirm) the public booking address.
- Instagram @samuelshoyer. YouTube https://www.youtube.com/@SamShoyerMusic (found 2026-11-24).

## Media

- Video: three live-loop Shorts on @SamShoyerMusic (2TlJBl15v-I "Butterfly - Crazy Town (Live
  Loop)", bfC5iQNJids "Live loop 11/22/26", _G_9w33wKDw "Live Loop 11/23/26"). Posters are YouTube's
  own 1080x1920 poster per Short, cached in `assets-src/yt/` and encoded by `scripts/posters.mjs` to
  `public/video/<id>.webp` at 720x1280. Playback is the YouTube no-cookie player, loaded on click.
  Add a video: list it in `src/content/videos.ts`, drop its poster in `assets-src/yt/`, run the script.
- Photos: none supplied yet. The doc asks for a photo of Sam with his multi-instrumentalist setup on
  the home page, and photos on the media page. Instagram blocks automated download; Eris or Sam
  saves them into `assets-src/`.
- Pipeline: list Drive file IDs (or local files under `assets-src/`) in `scripts/photos.json` with a
  key, set (`stage` / `studio` / `portrait`), and alt text, then `pnpm photos`. Key `hero` is the rig
  photo. Originals are never committed.
- Until photos exist the hero is the videos, and the media page is the videos and the two channels.
  No placeholders.

## Not in v1 (built so it can drop in)

- A live availability calendar (Google Calendar free/busy) on `/booking`.
- Full-quality hero loop (muted, autoplay) cut from a Short, once Sam sends the original file.
