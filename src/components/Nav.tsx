'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { nav, site } from '@/content/site';

export function Nav() {
  const path = usePathname();
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    menu.current?.close();
  }, [path]);

  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="type-log fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-4 py-3 text-white focus:translate-y-0">
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-ink bg-window">
        <div className="mx-auto flex h-16 max-w-[var(--container-content)] items-center justify-between px-4 md:h-[4.5rem] md:px-8">
          <Link href="/" aria-label={`${site.name}, home`} className="type-name text-[1.75rem] md:text-[2rem]">
            Sam Shoyer
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                aria-current={active(i.href) ? 'page' : undefined}
                className="type-log group flex items-center gap-2 py-2"
              >
                <span className="ring-knob size-3" data-lit={active(i.href)} aria-hidden />
                <span className="group-hover:underline group-hover:underline-offset-4">{i.label}</span>
              </Link>
            ))}
          </nav>
          <button type="button" onClick={() => menu.current?.showModal()} className="type-log -mr-3 min-h-11 px-3 md:hidden" aria-haspopup="dialog">
            Menu
          </button>
        </div>
      </header>

      <dialog ref={menu} aria-label="Menu" className="on-ink m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-white backdrop:bg-transparent">
        <div className="flex h-full flex-col px-4 pb-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="type-name text-[1.75rem]" onClick={() => menu.current?.close()}>
              Sam Shoyer
            </Link>
            <button type="button" onClick={() => menu.current?.close()} className="type-log -mr-3 min-h-11 px-3">
              Close
            </button>
          </div>
          <nav aria-label="Menu" className="mt-10 flex flex-col">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="flex items-center gap-4 border-t border-white/20 py-4 last:border-b"
                onClick={() => menu.current?.close()}
              >
                <span className="ring-knob size-6" data-lit={active(i.href)} aria-hidden />
                <span className="type-display !text-[3rem]">{i.label}</span>
              </Link>
            ))}
          </nav>
          <p className="type-log mt-auto flex flex-wrap gap-x-6 gap-y-3">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            <a href={site.instagram.url} className="link">
              Instagram {site.instagram.handle}
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
