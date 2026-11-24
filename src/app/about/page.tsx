import type { Metadata } from 'next';
import { VideoTile } from '@/components/VideoTile';
import { about } from '@/content/site';
import { videos } from '@/content/videos';

export const metadata: Metadata = {
  title: 'About',
  description: 'Sam Shoyer: Berklee-trained multi-instrumentalist, ex-Nashville side player, founder of Rocky Mountain Music School.',
};

type Credit = { name: string; role: string; where: string; when: string };

// Credits set like an album's liner notes.
function Liner({ title, rows }: { title: string; rows: readonly Credit[] }) {
  return (
    <section>
      <h3 className="type-log text-pine">{title}</h3>
      <dl className="mt-3 border-b border-ink">
        {rows.map((r) => (
          <div key={r.name} className="grid gap-1 border-t border-ink py-4 md:grid-cols-[14rem_1fr_10rem_7.5rem] md:gap-6">
            <dt className="font-medium">{r.name}</dt>
            <dd>{r.role}</dd>
            <dd className="text-pine">{r.where}</dd>
            <dd className="type-log whitespace-nowrap text-pine md:pt-1.5 md:text-right">{r.when}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function About() {
  const c = about.credits;
  // Sam on alto sax at his rig: the bio's first instrument, in his own video.
  const portrait = videos.find((v) => v.id === '_G_9w33wKDw');
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-4 pt-12 pb-24 md:px-8 md:pt-20">
      <div className="grid gap-10 md:grid-cols-[5fr_6fr] md:gap-16">
        <div>
          <h1 className="type-display">{about.title}</h1>
          {portrait ? <VideoTile video={portrait} className="mt-10 max-w-[18rem] md:sticky md:top-28" /> : null}
        </div>
        <div className="space-y-5">
          {about.bio.map((p, i) => (
            <p key={i} className={`measure ${i === 0 ? 'type-title !font-normal' : ''}`}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-32">
        <h2 className="type-display">{c.title}</h2>
        <div className="mt-10 grid gap-12">
          <Liner title="Education" rows={c.education} />
          <Liner title="Bands" rows={c.bands} />
          <Liner title="Teaching and theater" rows={c.other} />
        </div>
      </div>
    </div>
  );
}
