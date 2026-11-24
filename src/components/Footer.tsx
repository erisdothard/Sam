import Link from 'next/link';
import { footer, site } from '@/content/site';

export function Footer() {
  return (
    <footer className="border-t border-ink bg-window">
      <div className="mx-auto max-w-[var(--container-content)] px-4 pt-16 pb-8 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-[7fr_5fr] md:gap-16">
          <div>
            <p className="type-name text-[clamp(3.5rem,11vw,8rem)]">Sam Shoyer</p>
            <p className="type-log mt-6 text-mahogany">{site.home}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 self-end">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <h2 className="type-title">{c.title}</h2>
                <ul className="mt-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith('/') ? (
                        <Link href={l.href} className="link inline-flex min-h-11 items-center">
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className="link inline-flex min-h-11 items-center">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="type-log mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-6 text-pine">
          <p>© 2026 {site.name}</p>
          <a href={footer.credit.href} className="link inline-flex min-h-11 items-center">
            {footer.credit.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
