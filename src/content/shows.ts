// Every show Sam plays. Add new ones anywhere in the list; the site sorts them and moves a show to
// "Past" the day after it happens (Mountain time).
//
// date: 'YYYY-MM-DD'. Set `monthOnly: true` when only the month is known (use the 1st); the show
// stays upcoming until that month is over.

export type Show = {
  date: string;
  monthOnly?: boolean;
  time?: string;
  venue: string;
  town: string;
  note?: string;
  link?: string;
};

export const shows: Show[] = [
  {
    date: '2026-11-14',
    time: '5–8pm',
    venue: 'Cabin Creek Brewing',
    town: 'Georgetown, CO',
  },
  {
    // TODO(confirm): exact dates of the run. The credits list it as 2027.
    date: '2027-01-01',
    monthOnly: true,
    venue: 'Historic Schoolhouse',
    town: 'Georgetown, CO',
    note: 'Musical director of Snow White, a British pantomime comedy',
  },
];
