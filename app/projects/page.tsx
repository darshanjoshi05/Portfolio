'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { PROJECTS } from '@/lib/data'
import BackBar from '@/components/ui/BackBar'

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const FILTERS = [
  { id: 'all',      label: 'All' },
  { id: 'ai',       label: 'AI / ML' },
  { id: 'backend',  label: 'Backend' },
  { id: 'security', label: 'Security' },
  { id: 'db',       label: 'Database' },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category.includes(filter))

  return (
    <>
      <ProgressBar />
      <Nav />
      <BackBar label="Back to Home" href="/" section="All Projects" />
      <div className="relative z-10 pt-8 sm:pt-12 pb-20 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" /> {PROJECTS.length} Projects
          </div>
          <SectionHeader num="03" title="All Projects" />
          <p className="text-[0.85rem] leading-[1.85] text-muted max-w-xl mb-10">
            A complete collection of AI, backend, security, and database engineering projects — from research labs to production systems.
          </p>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2 border font-mono transition-all ${filter === f.id ? 'border-accent text-accent bg-accent/8' : 'border-white/[0.08] text-muted hover:border-accent/40 hover:text-accent/80'}`}>
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="relative z-10 px-6 md:px-16 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.06}>
              <Link href={`/projects/${p.id}`}
                className="group block border border-white/[0.06] p-7 hover:border-accent/30 hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)] transition-all duration-300 relative overflow-hidden h-full"
                style={{ background: 'var(--surface)' }}>

                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="relative z-10">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[0.62rem] tracking-[0.2em] text-accent/60 font-mono">{p.num}</span>
                    <div className="flex gap-1.5">
                      {p.category.map(c => (
                        <span key={c} className="text-[0.55rem] tracking-[0.08em] uppercase px-2 py-0.5 border border-white/[0.07] text-muted/70">{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">{p.name}</h3>
                  <p className="text-[0.72rem] text-accent mb-3">{p.tagline}</p>
                  <p className="text-[0.78rem] leading-[1.78] text-muted mb-5 line-clamp-3">{p.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-white/[0.05]">
                    {p.stats.map(s => (
                      <div key={s.label} className="text-center">
                        <div className="font-serif text-lg font-bold text-accent">{s.value}</div>
                        <div className="text-[0.55rem] tracking-[0.08em] uppercase text-muted mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.slice(0, 4).map(s => (
                      <span key={s} className="text-[0.6rem] px-2 py-0.5 border border-white/[0.07] text-muted/70">{s}</span>
                    ))}
                    {p.stack.length > 4 && <span className="text-[0.6rem] text-muted/40">+{p.stack.length - 4} more</span>}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-[0.68rem] tracking-[0.1em] uppercase text-accent flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                      View Project <span>→</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[0.65rem] font-mono text-muted/60">{p.period}</span>
                      <button
                        onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank', 'noopener,noreferrer') }}
                        className="text-muted hover:text-accent transition-colors cursor-pointer"
                        aria-label="View on GitHub"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
