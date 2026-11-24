// Every word on the site lives here. Voice rules: .ulpi/design/DESIGN.md "Voice".
// Source for each fact: Sam's "Website Ideas" doc, see .ulpi/design/site.md. TODO(confirm) marks
// anything Sam has not signed off yet.

export const site = {
  name: 'Sam Shoyer',
  url: 'https://sam-shoyer.vercel.app', // TODO(confirm): final domain
  tagline: 'Multi-instrumentalist, live-loop performer, and music teacher in the Colorado mountains.',
  description:
    'Sam Shoyer builds full-band songs live, one looped layer at a time, and teaches sax, guitar, bass, keys, synth and production from his studio in Silver Plume, Colorado.',
  email: 'sam.shoyer@gmail.com', // TODO(confirm): public booking address (the doc's owner address)
  instagram: { handle: '@samuelshoyer', url: 'https://www.instagram.com/samuelshoyer/' },
  youtube: { name: 'Sam Shoyer Music', handle: '@SamShoyerMusic', url: 'https://www.youtube.com/@SamShoyerMusic' },
  home: 'Silver Plume, Colorado',
} as const;

export const nav = [
  { href: '/shows', label: 'Shows' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/booking', label: 'Booking' },
  { href: '/about', label: 'About' },
  { href: '/media', label: 'Media' },
] as const;

export const home = {
  videosTitle: 'Live loops',
  videosNote: 'Filmed in the studio in Silver Plume. Every part is played and looped live, then the next one goes on top.',
  actions: [
    { href: '/booking', label: 'Book a show' },
    { href: '/lessons', label: 'Book lessons' },
  ],
  more: [
    { href: '/shows', label: 'Live shows' },
    { href: '/about', label: 'About Sam' },
    { href: '/booking#form', label: 'Contact' },
  ],
  nextShow: { title: 'Next show', none: 'New dates are on the way. Instagram gets them first.', all: 'All shows' },
  split: {
    play: {
      word: 'Play',
      line: 'Four sets for venues, bars, weddings and events, from a full live-looped band of one to a quiet acoustic hour.',
      link: 'See the sets',
      href: '/booking',
    },
    teach: {
      word: 'Teach',
      line: 'Sax, guitar, bass, keys, synth, production and looping. All ages, all levels, out of a studio in Silver Plume.',
      link: 'Lessons and rates',
      href: '/lessons',
    },
  },
  about: {
    title: 'A band built live',
    body: 'Sam layers guitar, bass, keys, synth, vocals, harmonica, alto sax and drums into one performance, on stage, in front of you. Rock, pop, soul, folk and jam, by way of Geneva, Washington, Honolulu, the Pacific Crest Trail and Nashville.',
    link: 'Read more about Sam',
  },
} as const;

// The instruments in Sam's live rig, in the order the booking page draws their rings.
export const rig = ['Alto sax', 'Guitar', 'Bass', 'Keys', 'Synth', 'Drum machine'] as const;
export type RigPart = (typeof rig)[number];

export type BookingSet = {
  id: string;
  name: string;
  body: string;
  parts: readonly RigPart[];
};

export const booking = {
  title: 'Book Sam',
  availability: 'Check availability',
  lead: 'Available for venues, bars, weddings and events. Every set is played live. The loops are built in front of the room, not pressed play on.',
  setsTitle: 'Four sets',
  sets: [
    {
      id: 'full',
      name: 'Full Live Set',
      body: 'Original live-looped music with some covers. Saxophone, guitar, bass, keyboard, synth and drum machine.',
      parts: ['Alto sax', 'Guitar', 'Bass', 'Keys', 'Synth', 'Drum machine'],
    },
    {
      id: 'jazz',
      name: 'Jazz Standards',
      body: 'A live-looped set of standards on alto saxophone, guitar and keyboards.',
      parts: ['Alto sax', 'Guitar', 'Keys'],
    },
    {
      id: 'acoustic',
      // TODO(confirm): the doc's line ends mid-sentence ("can optionally"). Ask Sam how it ends.
      name: 'Acoustic Set',
      body: 'Folk, blues and pop on acoustic guitar.',
      parts: ['Guitar'],
    },
    {
      id: 'dance',
      // TODO(confirm): drum machine too? The doc lists guitar, sax and synth.
      name: 'DJ Style Dance Set',
      body: 'Upbeat live loops with electric guitar, saxophone and live synth accompaniment.',
      parts: ['Alto sax', 'Guitar', 'Synth'],
    },
  ] satisfies BookingSet[],
  hire: {
    title: 'Hire a player',
    body: 'Sam is available as a live and session instrumentalist.',
    instruments: ['Alto saxophone', 'Guitar', 'Bass', 'Keyboards', 'Synth', 'Vocals'],
  },
  for: {
    title: 'Good for',
    body: 'Every set, and live or session playing, for:',
    items: ['Venues', 'Bars and breweries', 'Weddings', 'Private and community events'],
  },
  form: {
    title: 'Check a date',
    // TODO(confirm): "Click here for booking availability" in the doc. If Sam keeps a public
    // calendar, link it here; until then the form asks for the date and Sam answers.
    lead: 'Send the date and the room. Sam writes back with availability, usually within a couple of days.',
    types: ['Full Live Set', 'Jazz Standards', 'Acoustic Set', 'DJ Style Dance Set', 'Session or hired player', 'Lessons', 'Something else'],
    events: ['Venue or bar', 'Wedding', 'Private event', 'Community or school event', 'Studio session', 'Lessons'],
    submit: 'Send it',
    sending: 'Sending',
    sent: 'Got it. Sam will write back soon.',
    failed: 'This form sends through email for now.',
    openEmail: 'Open the email, already filled in',
  },
} as const;

export const lessons = {
  title: 'Lessons',
  lead: 'All ages, all experience levels. One-on-one, or bring the band.',
  where: {
    title: 'Where',
    studio: 'The studio is in Silver Plume.',
    areas: ['Denver', 'Golden', 'Evergreen', 'Clear Creek County', 'Summit County'],
    areasLead: 'Serving',
  },
  what: {
    title: 'What',
    instruments: [
      'Saxophone',
      'Guitar',
      'Bass',
      'Keyboard',
      'Synth',
      'Drum machine and looping',
      'Music production (Pro Tools, Logic)',
      'Band and group lessons',
    ],
  },
  rates: {
    title: 'Rates',
    rows: [
      { what: 'Private lesson', length: '30 minutes', price: '$35' },
      { what: 'Private lesson', length: '1 hour', price: '$60' },
      { what: 'Group lesson, 3 to 8 students', length: '1 hour', price: '$20 per student' },
    ],
  },
  cta: { title: 'Start lessons', body: 'Say what you play, or want to, and when you are free.', label: 'Book lessons', href: '/booking?type=Lessons#form' },
} as const;

export const about = {
  title: 'About Sam',
  bio: [
    'Sam Shoyer is a multi-instrumentalist, live-looping artist, and music educator based in the mountains of Colorado. Blending rock, pop, soul, folk, and jam music, Sam builds full-band arrangements live on stage, layering guitar, bass, keyboards, synthesizers, vocals, harmonica, alto saxophone, and drums into a dynamic, one-of-a-kind performance.',
    'Born in Geneva, Switzerland, and raised in Washington, D.C., Sam began his musical journey studying alto saxophone at the Levine School of Music Conservatory. After high school, he moved to Hawaii to work as a SCUBA guide, where he also began busking on the streets of Honolulu. A year later, he set off to hike the Pacific Crest Trail, meeting a Nashville songwriter along the way who helped inspire his next chapter. In 2017, Sam moved to Nashville, spending three years performing and touring with artists and bands including Everyday Museum, COCO, Austin Campbell, and Habilis.',
    'Today, Sam calls Silver Plume, Colorado, home, where he performs, teaches, and develops after-school music programs. Whether building a song from scratch on stage or helping a student discover their own musical voice, his approach is rooted in the same belief: music is at its best when it brings people together. For Sam, it’s all about the joy of playing, the freedom to explore, and the connections made from music.',
  ],
  credits: {
    title: 'Credits',
    education: [{ name: 'Berklee College of Music', role: 'BA, Music Performance and Music Production', where: 'Boston, MA', when: '2023' }],
    bands: [
      { name: 'Everyday Museum', role: 'Keyboards, synth, alto saxophone', where: 'Nashville, TN', when: '2017–2020' },
      { name: 'COCO', role: 'Keyboards, synth, guitar, alto saxophone', where: 'Nashville, TN', when: '2018–2020' },
      { name: 'Austin Campbell', role: 'Synth', where: 'Nashville, TN', when: '2019–2020' },
      { name: 'Habilis', role: 'Keyboards, synth, guitar, vocals, alto saxophone', where: 'Nashville, TN', when: '2020' },
      { name: 'Saxon Sound', role: 'Bass', where: 'Georgetown, CO', when: '2020–now' },
    ],
    other: [
      {
        name: 'Rocky Mountain Music School',
        role: 'Founder. A grant-funded after-school music program with the Summit County School District',
        where: 'Breckenridge, CO',
        when: '2022–2025',
      },
      {
        name: 'Snow White, a British pantomime comedy',
        role: 'Musical director',
        where: 'Georgetown, CO',
        when: '2027',
      },
    ],
  },
} as const;

export const media = {
  title: 'Media',
  lead: 'Live loops from the studio in Silver Plume. New ones go up on YouTube and Instagram first.',
  photosTitle: 'Photos',
} as const;

export const footer = {
  columns: [
    {
      title: 'Hear',
      links: [
        { href: '/shows', label: 'Upcoming shows' },
        { href: site.youtube.url, label: 'YouTube' },
        { href: site.instagram.url, label: 'Instagram' },
      ],
    },
    {
      title: 'Book',
      links: [
        { href: '/booking', label: 'Book a show' },
        { href: '/lessons', label: 'Book lessons' },
        { href: `mailto:${site.email}`, label: 'Email Sam' },
      ],
    },
  ],
  credit: { label: 'Site by Syntra AI', href: 'https://www.syntraai.tech' },
} as const;

export const notFound = {
  title: 'Nothing recorded here',
  body: 'This page has nothing on it yet. The loop is empty.',
  link: 'Back to the top',
} as const;
