'use client';

import { useEffect, useState } from 'react';
import type { Video } from '@/content/videos';
import { posterBlur } from '@/content/posters';

const EVENT = 'sam:play';

function logDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${Number(m)}/${Number(d)}/${y.slice(2)}`;
}

// One live loop: its own poster at 9:16, the track ring as the play control. Click swaps the poster
// for the YouTube no-cookie player in the same box. Starting one stops any other on the page.
export function VideoTile({ video, priority = false, className = '' }: { video: Video; priority?: boolean; className?: string }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onPlay = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== video.id) setPlaying(false);
    };
    window.addEventListener(EVENT, onPlay);
    return () => window.removeEventListener(EVENT, onPlay);
  }, [video.id]);

  const play = () => {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: video.id }));
    setPlaying(true);
  };

  return (
    <figure className={className}>
      <div className="relative aspect-[9/16] overflow-hidden bg-ink" style={{ backgroundImage: `url(${posterBlur[video.id]})`, backgroundSize: 'cover' }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={play} className="ring-hover group absolute inset-0 size-full text-left" aria-label={`Play ${video.title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/video/${video.id}.webp`}
              alt={video.alt}
              width={720}
              height={1280}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className="size-full object-cover transition-[filter] duration-150 group-hover:brightness-[1.04]"
            />
            <span className="on-ink absolute bottom-3 left-3 flex items-center gap-2 bg-ink py-1.5 pr-3 pl-1.5 text-white">
              <span className="ring-knob size-7" data-lit="false" aria-hidden />
              <span className="type-log">Play</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex items-start gap-2.5">
        <span className="ring-knob mt-px size-4" data-lit={playing} aria-hidden />
        <span className="type-log">
          <span className="block">{video.title}</span>
          {/* Sam often dates the title himself; only add the date when he did not. */}
          {video.title.includes(logDate(video.date)) ? null : <span className="block text-pine">{logDate(video.date)}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
