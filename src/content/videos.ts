// Sam's live loops on YouTube (@SamShoyerMusic). Newest first. Posters: scripts/posters.mjs.
// Titles are Sam's own, in his own capitalisation. `alt` describes the poster frame.

export type Video = {
  id: string;
  title: string;
  /** YYYY-MM-DD the video went up (YouTube's publish date). */
  date: string;
  alt: string;
};

export const videos: Video[] = [
  {
    id: '2TlJBl15v-I',
    title: 'Butterfly - Crazy Town (Live Loop)',
    date: '2026-11-24',
    alt: 'Sam looping a sunburst electric guitar over his keyboards, a red kilim rug on the floor',
  },
  {
    id: '_G_9w33wKDw',
    title: 'Live Loop 11/23/26',
    date: '2026-11-23',
    alt: 'Sam playing gold alto saxophone into a vocal mic beside two stacked keyboards and a loop station, snow in the window behind',
  },
  {
    id: 'bfC5iQNJids',
    title: 'Live loop 11/22/26',
    date: '2026-11-22',
    alt: 'Sam playing a sunburst electric guitar at his keyboard rig in the studio',
  },
];
