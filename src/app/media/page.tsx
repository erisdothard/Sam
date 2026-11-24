import type { Metadata } from 'next';
import { VideoTile } from '@/components/VideoTile';
import { media, site } from '@/content/site';
import { videos } from '@/content/videos';
import { photos } from '@/content/photos';

export const metadata: Metadata = {
  title: 'Media',
  description: 'Live loops from Sam Shoyer’s studio in Silver Plume, Colorado. YouTube @SamShoyerMusic, Instagram @samuelshoyer.',
};

const sheet = photos.filter((p) => p.key !== 'hero');

export default function Media() {
  const channels = [
    { name: 'YouTube', handle: site.youtube.handle, url: site.youtube.url },
    { name: 'Instagram', handle: site.instagram.handle, url: site.instagram.url },
  ];
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-4 pt-12 pb-24 md:px-8 md:pt-20">
      <div className="grid gap-6 md:grid-cols-[5fr_7fr] md:items-end md:gap-16">
        <h1 className="type-display">{media.title}</h1>
        <p className="measure md:text-[1.375rem] md:leading-[1.5]">{media.lead}</p>
      </div>

      <section aria-labelledby="videos" className="mt-14 md:mt-20">
        <h2 id="videos" className="type-log border-b border-ink pb-3">
          Live loops ({videos.length})
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {videos.map((v, i) => (
            <VideoTile key={v.id} video={v} priority={i < 2} />
          ))}
        </div>
      </section>

      <ul className="mt-20 border-b border-ink">
        {channels.map((c) => (
          <li key={c.name} className="border-t border-ink">
            <a href={c.url} className="group grid gap-1 py-7 md:grid-cols-[5fr_7fr] md:items-baseline md:gap-16">
              <span className="type-display transition-colors duration-150 group-hover:text-kilim">{c.name}</span>
              <span className="type-log link">{c.handle}</span>
            </a>
          </li>
        ))}
      </ul>

      {sheet.length ? (
        <section aria-labelledby="photos" className="mt-20">
          <h2 id="photos" className="type-log border-b border-ink pb-3">
            {media.photosTitle}
          </h2>
          {/* Contact sheet: true aspect ratios, hairline gaps, no square crops. */}
          <ul className="mt-6 flex flex-wrap gap-1">
            {sheet.map((p) => (
              <li key={p.key} style={{ flexGrow: p.width / p.height, flexBasis: `${(p.width / p.height) * 14}rem` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
