import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-700">Page not found</p>
      <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950">404 — We couldn’t find that page</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        The page you are looking for may have moved, or the URL may be incorrect.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to homepage
      </Link>
    </main>
  );
}
