import Link from 'next/link';
import { notFound } from '@/content/site';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[var(--container-content)] px-4 py-24 md:px-8 md:py-36">
      <span className="ring-knob size-20" data-lit="false" aria-hidden />
      <h1 className="type-display mt-10">{notFound.title}</h1>
      <p className="mt-6">{notFound.body}</p>
      <Link href="/" className="btn mt-10">
        {notFound.link}
      </Link>
    </div>
  );
}
