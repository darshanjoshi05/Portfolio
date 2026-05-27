import Link from 'next/link'
import { PERSON } from '@/lib/data'

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const EmailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 8 10-8"/>
  </svg>
)
const ScholarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
)

export default function Footer() {
  const scholar = (PERSON as any).scholar ?? 'https://scholar.google.com'

  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-4 sm:px-6 md:px-16 py-12" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
          <div>
            <div className="font-sans font-black text-accent text-xl tracking-tight mb-1">Darshan Joshi</div>
            <p className="text-[0.68rem] text-muted font-mono"> Software Engineer · AI Systems · Full Stack · Backend </p>  
            <p className="text-[0.62rem] text-muted/50 mt-0.5 font-mono">Southfield, MI · Open to Opportunities</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.68rem]">
            {[
              { href: '/', label: 'Home' },
              { href: '/projects', label: 'Projects' },
              { href: '/education', label: 'Education' },
              { href: '/publications', label: 'Research' },
              { href: '/contact', label: 'Contact' },
              { href: '/resume', label: 'Résumé' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="text-muted hover:text-accent transition-colors whitespace-nowrap tracking-[0.06em] uppercase">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Availability strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-accent/15 bg-accent/[0.03] px-5 py-3.5 mb-6">
          <div className="flex items-center gap-3">
            <span className="relative flex w-2 h-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-[0.68rem] font-mono text-accent tracking-[0.08em]">Available for hire</span>
            <span className="text-[0.62rem] text-muted/60 font-mono">·Software Engineer / AI Engineer / Full Stack roles · Remote or Southfield, MI</span>
          </div>
          <Link href="/contact"
            className="text-[0.62rem] tracking-[0.12em] uppercase text-accent border border-accent/30 px-4 py-1.5 hover:bg-accent/10 transition-all whitespace-nowrap font-mono">
            Get in Touch →
          </Link>
        </div>

        <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-5">
          <span className="text-[0.62rem] text-muted/50 font-mono">
            © 2026 Darshan Joshi · Built with Next.js 14, Three.js & Framer Motion
          </span>
          <div className="flex items-center gap-2.5">
            {[
              { href: PERSON.github,   label: 'GitHub',         Icon: GithubIcon },
              { href: PERSON.linkedin, label: 'LinkedIn',       Icon: LinkedInIcon },
              { href: scholar,         label: 'Google Scholar', Icon: ScholarIcon },
              { href: `mailto:${PERSON.email}`, label: 'Email', Icon: EmailIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={label}
                className="w-9 h-9 flex items-center justify-center border border-white/[0.08] text-muted hover:border-accent/40 hover:text-accent transition-all hover:-translate-y-px">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
