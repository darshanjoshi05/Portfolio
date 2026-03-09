import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">404 — Not Found</div>
      <h1 className="font-serif text-[6rem] font-bold leading-none gradient-text mb-4">404</h1>
      <p className="text-muted text-[0.85rem] mb-8 max-w-sm">
        This page doesn't exist. Maybe you followed a stale link or typed the URL wrong.
      </p>
      <Link href="/" className="clip-btn bg-accent text-black font-sans font-bold text-[0.75rem] tracking-[0.1em] uppercase px-8 py-3 hover:shadow-[0_8px_32px_rgba(0,212,255,0.4)] transition-all">
        Back Home →
      </Link>
    </div>
  )
}
