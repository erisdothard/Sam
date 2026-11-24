import Link from 'next/link';
import { Suspense } from 'react';
import { NextShow } from '@/components/NextShow';
import { VideoTile } from '@/components/VideoTile';
import { home, site } from '@/content/site';
import { videos } from '@/content/videos';

export default function Home() {
  const reel = videos.slice(0, 3);
  return (
    <>
      <section className="mx-auto grid max-w-[var(--container-content)] gap-12 px-4 pt-10 pb-16 md:grid-cols-[4fr_8fr] md:gap-10 md:px-8 md:pt-16 md:pb-24 lg:gap-14">
        <div className="flex flex-col md:pt-6">
          <h1 className="type-name text-[clamp(4.25rem,19vw,10rem)] md:text-[clamp(4rem,7.4vw,7.75rem)]">
            Sam
            <br />
            Shoyer
          </h1>
          <p className="type-title mt-8 max-w-[24ch] !font-normal">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={home.actions[0].href} className="btn">
              {home.actions[0].label}
            </Link>
            <Link href={home.actions[1].href} className="btn btn-line">
              {home.actions[1].label}
            </Link>
          </div>
          <p className="mt-4 flex flex-wrap gap-x-6">
            {home.more.map((l) => (
              <Link key={l.href} href={l.href} className="link inline-flex min-h-11 items-center">
                {l.label}
              </Link>
            ))}
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3">
            <h2 className="type-log">{home.videosTitle}</h2>
            <Link href="/media" className="type-log link -my-3 inline-flex min-h-11 items-center">
              All videos
            </Link>
          </div>
          {/* Phones: a snap row, one and a bit tiles wide. From md: three in a row. */}
          <div className="-mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {reel.map((v, i) => (
              <VideoTile key={v.id} video={v} priority={i === 0} className="w-[68vw] max-w-[20rem] flex-none snap-start md:w-auto md:max-w-none" />
            ))}
          </div>
          <p className="mt-5 max-w-[46ch] text-mahogany">{home.videosNote}</p>
        </div>
      </section>

      <Suspense fallback={<div className="h-56 bg-kilim" />}>
        <NextShow />
      </Suspense>

      <section aria-label="Play and teach" className="grid border-b border-ink md:grid-cols-2">
        {[home.split.play, home.split.teach].map((h, i) => (
          <div key={h.word} className={`px-4 py-16 md:px-8 md:py-24 ${i === 0 ? 'border-b border-ink md:border-r md:border-b-0' : ''}`}>
            <div className={`max-w-[34rem] ${i === 0 ? 'md:ml-auto md:mr-8' : 'md:ml-8'}`}>
              <h2 className="type-display italic">{h.word}</h2>
              <p className="mt-6 measure">{h.line}</p>
              <Link href={h.href} className="btn btn-line mt-8">
                {h.link}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="mx-auto grid max-w-[var(--container-content)] gap-6 px-4 py-16 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8 md:py-24">
          <h2 className="type-display">{home.about.title}</h2>
          <div>
            <p className="measure md:text-[1.375rem] md:leading-[1.5]">{home.about.body}</p>
            <Link href="/about" className="link mt-6 inline-block">
              {home.about.link}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
