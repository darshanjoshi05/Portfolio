'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { PERSON, SKILLS, EXPERIENCE, PROJECTS, PUBLICATIONS } from '@/lib/data'

const HeroScene   = dynamic(() => import('@/components/three/HeroScene'),   { ssr: false })
const ParticleCanvas = dynamic(() => import('@/components/three/ParticleCanvas'), { ssr: false })

/* ── animated counter ── */
function Counter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref  = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const num  = parseFloat(target.replace(/[^0-9.]/g, ''))
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start: number
    const dur = 1600
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setVal(parseFloat((num * p).toFixed(target.includes('.') ? 2 : 0)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, num, target])

  return <span ref={ref}>{isNaN(num) ? target : val}{suffix}</span>
}

/* ── fade-up wrapper ── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [termLine, setTermLine] = useState(0)

  const termLines = [
    { t: 'cmd', text: '$ python train.py --model yolov8n --epochs 100' },
    { t: 'out', text: 'Epoch 1/100: loss=2.34, mAP@50=0.21' },
    { t: 'out', text: 'Epoch 25/100: loss=1.12, mAP@50=0.54' },
    { t: 'key', text: 'Epoch 50/100: loss=0.78, mAP@50=0.71' },
    { t: 'str', text: 'Epoch 75/100: loss=0.51, mAP@50=0.83' },
    { t: 'num', text: 'Epoch 100/100: loss=0.38, mAP@50=0.91' },
    { t: 'out', text: 'Training complete. Saving best.pt...' },
    { t: 'cmd', text: '$ python evaluate.py --weights best.pt' },
    { t: 'key', text: 'Precision: 0.89 | Recall: 0.87 | mAP@50: 0.91' },
    { t: 'out', text: 'Grad-CAM activated. Saving heatmaps...' },
    { t: 'str', text: 'All done. Results saved to /runs/detect/' },
    { t: 'cmd', text: '$ _' },
  ]

  useEffect(() => {
    if (termLine >= termLines.length) return
    const t = setTimeout(() => setTermLine(l => l + 1), 220)
    return () => clearTimeout(t)
  }, [termLine])

  const termColor: Record<string, string> = {
    cmd: 'text-accent', out: 'text-[#34d399]', key: 'text-[#a78bfa]', str: 'text-accent3', num: 'text-theme',
  }

  return (
    <>
      <ProgressBar />
      <Nav />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-bg/95 via-bg/70 to-bg/20 pointer-events-none" />

        <div className="relative z-[3] px-4 sm:px-6 md:px-16 pt-24 sm:pt-20 pb-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left */}
            <div>
              {/* Mobile-only circular photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex items-center gap-4 mb-5 lg:hidden"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-[3px] rounded-full border border-accent/50 pointer-events-none" />
                  <div className="absolute -inset-[6px] rounded-full border border-accent/20 pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpg"
                    alt="Darshan Joshi"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top border-2 border-accent/40"
                  />
                  <span className="absolute bottom-0.5 right-0.5 flex">
                    <span className="absolute inline-block w-3 h-3 rounded-full bg-[#34d399]/40 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#34d399] border-2 border-bg" />
                  </span>
                </div>
                <div>
                  <div className="text-[0.7rem] font-sans font-bold text-theme">Darshan Joshi</div>
                  <div className="text-[0.6rem] text-accent tracking-[0.1em] uppercase">Software Engineer</div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-accent mb-3 sm:mb-4 flex items-center gap-3">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Available for Opportunities
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
                className="font-serif text-[clamp(2.8rem,9vw,6rem)] font-bold leading-[0.92] tracking-[-0.03em] mb-5 sm:mb-6">
                Darshan<br />
                <span className="gradient-text">Joshi</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[0.8rem] sm:text-[0.85rem] leading-[1.85] text-muted max-w-[520px] mb-6 sm:mb-8">
                Building AI systems, full stack applications, and backend services. Research Assistant at Lawrence Tech — 2 publications, MS in CS (GPA 3.35/4.0). Open to Software Engineer, AI, and Full Stack roles.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link href="/projects" className="clip-btn bg-accent text-black font-sans font-bold text-[0.74rem] sm:text-[0.78rem] tracking-[0.1em] uppercase px-6 sm:px-8 py-3 hover:shadow-[0_8px_32px_rgba(0,212,255,0.45)] active:translate-y-0 hover:-translate-y-px transition-all">
                  View Projects
                </Link>
                <Link href="/contact" className="font-sans font-bold text-[0.74rem] sm:text-[0.78rem] tracking-[0.1em] uppercase px-6 sm:px-8 py-3 border border-white/[0.12] text-muted hover:border-accent/50 hover:text-accent transition-all">
                  Contact Me
                </Link>
                <a href="/resume" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans font-bold text-[0.74rem] sm:text-[0.78rem] tracking-[0.1em] uppercase px-5 sm:px-6 py-3 border border-accent/25 text-accent hover:bg-accent/[0.07] transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Résumé
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-4 gap-3 sm:gap-6">
                {PERSON.stats.map(s => (
                  <div key={s.label}>
                    <div className="font-serif text-[1.5rem] sm:text-[1.9rem] font-bold text-accent leading-none">
                      <Counter target={s.value} />
                    </div>
                    <div className="text-[0.52rem] sm:text-[0.58rem] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-muted mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — photo + terminal */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
              className="hidden lg:flex flex-col gap-6">
              <div className="self-center flex flex-col items-center gap-3">
                <div className="relative" style={{ animation: 'float-photo 3.5s ease-in-out infinite' }}>
                  <div className="absolute -inset-[3px] rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #f59e0b, #00d4ff)', backgroundSize: '300% 300%', animation: 'gradient-shift 4s ease infinite', borderRadius: '9999px' }} />
                  <div className="absolute -inset-[10px] rounded-full pointer-events-none opacity-40"
                    style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/photo.jpg" alt="Darshan Joshi"
                    className="relative w-[200px] h-[200px] rounded-full object-cover object-top border-[3px] border-bg"
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                  <span className="absolute bottom-3 right-3 flex" style={{ zIndex: 2 }}>
                    <span className="absolute inline-block w-4 h-4 rounded-full bg-[#34d399]/40 animate-ping" />
                    <span className="relative w-4 h-4 rounded-full bg-[#34d399] border-2 border-bg" />
                  </span>
                </div>
                <div style={{ width: '120px', height: '10px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.25) 0%, transparent 70%)', animation: 'shadow-fade 3.5s ease-in-out infinite' }} />
              </div>

              {/* Terminal */}
              <div className="border border-accent/10 rounded-sm p-4 font-mono text-[0.65rem] leading-[1.7]" style={{ background: 'var(--surface)' }}>
                <div className="flex gap-2 mb-3 pb-2 border-b border-white/[0.05]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-auto text-[0.55rem] text-muted/60">darshan@research ~ train.py</span>
                </div>
                {termLines.slice(0, termLine).map((l, i) => (
                  <div key={i} className={termColor[l.t] || 'text-muted'}>{l.text}</div>
                ))}
                {termLine < termLines.length && (
                  <span className="inline-block w-[6px] h-[13px] bg-accent animate-blink align-middle" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 text-muted">
          <span className="text-[0.6rem] tracking-[0.18em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted/50 to-transparent animate-float" />
        </div>
      </section>

      <ParticleCanvas />

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="relative z-10 px-4 sm:px-6 md:px-16 py-20 sm:py-32 max-w-7xl mx-auto">
        <SectionHeader num="01" title="About Me" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-3 space-y-5">
            {PERSON.bio.map((p, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <p className="text-[0.85rem] leading-[1.9] text-muted">{p}</p>
              </FadeUp>
            ))}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-4">
                {SKILLS.map(s => (
                  <span key={s.name}
                    className={`text-[0.65rem] tracking-[0.08em] uppercase px-3 py-1 border transition-all ${s.hot ? 'border-accent2/40 text-[#a78bfa] bg-accent2/5 hover:bg-accent2/10' : 'border-white/[0.08] text-muted hover:border-accent/30 hover:text-accent'}`}>
                    {s.name}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <FadeUp>
              <div className="hidden lg:flex flex-col items-center gap-2 mb-6">
                <div className="relative" style={{ animation: 'float-photo 3.5s ease-in-out infinite' }}>
                  <div className="absolute -inset-[3px] rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #f59e0b, #00d4ff)', backgroundSize: '300% 300%', animation: 'gradient-shift 4s ease infinite', borderRadius: '9999px' }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/photo.jpg" alt="Darshan Joshi"
                    className="relative w-24 h-24 rounded-full object-cover object-top border-[3px] border-bg"
                    style={{ position: 'relative', zIndex: 1 }}
                  />
                </div>
                <div style={{ width: '60px', height: '6px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,212,255,0.2) 0%, transparent 70%)', animation: 'shadow-fade 3.5s ease-in-out infinite' }} />
              </div>
            </FadeUp>

            {[
              { label: 'Location', val: PERSON.location },
              { label: 'Status', val: 'Open to Opportunities', accent: true },
              { label: 'Degree', val: 'M.S. Computer Science' },
              { label: 'GPA', val: '3.35 / 4.0', accent: true },
              { label: 'Publications', val: '2 Research Papers', accent: true },
              { label: 'Email', val: PERSON.email },
            ].map((r, i) => (
              <FadeUp key={r.label} delay={i * 0.06}>
                <div className="flex justify-between items-start py-3 border-b border-white/[0.05]">
                  <span className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">{r.label}</span>
                  <span className={`text-[0.75rem] font-mono ${r.accent ? 'text-accent' : 'text-theme'}`}>{r.val}</span>
                </div>
              </FadeUp>
            ))}

            <FadeUp delay={0.4}>
              <a href="/resume" target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center justify-between w-full border border-accent/25 bg-accent/[0.04] px-4 py-3 hover:bg-accent/[0.08] hover:border-accent/50 transition-all group">
                <span className="text-[0.68rem] tracking-[0.1em] uppercase text-accent font-sans font-bold">Download Résumé</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-accent group-hover:translate-y-0.5 transition-transform">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section id="experience" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-7xl mx-auto">
        <SectionHeader num="02" title="Experience" />
        <div className="relative pl-6 md:pl-12">
          <div className="absolute left-0 top-2 bottom-2 w-px timeline-line" />
          {EXPERIENCE.map((exp, i) => (
            <FadeUp key={i} delay={0.1}>
              <div className="relative mb-16 last:mb-0">
                <div className="absolute -left-[25px] md:-left-[49px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-bg shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
                <div className="border border-white/[0.06] bg-surface p-8 hover:border-accent/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-sans font-bold text-xl text-theme mb-1">{exp.role}</h3>
                      <div className="text-accent text-[0.8rem]">{exp.org} · {exp.location}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exp.current && (
                        <span className="text-[0.6rem] tracking-[0.12em] uppercase bg-accent/10 border border-accent/30 text-accent px-3 py-1">Current</span>
                      )}
                      <span className="text-[0.72rem] text-muted font-mono">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="flex gap-3 text-[0.8rem] leading-[1.7] text-muted">
                        <span className="text-accent mt-[3px] shrink-0">›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══════════ PROJECTS PREVIEW ══════════ */}
      <section id="projects" className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-24 max-w-7xl mx-auto">
        <SectionHeader num="03" title="Selected Projects" />

        {PROJECTS.filter(p => p.featured).map(p => (
          <FadeUp key={p.id} delay={0.05} className="mb-5">
            <Link href={`/projects/${p.id}`}
              className="group block border p-7 sm:p-8 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'var(--surface)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[0.6rem] tracking-[0.15em] text-muted font-mono">{p.num}</span>
                    <span className="text-[0.58rem] tracking-[0.1em] uppercase px-2 py-0.5 border border-accent/30 text-accent bg-accent/5">Featured</span>
                    {p.category.map(c => (
                      <span key={c} className="text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 border border-white/[0.08] text-muted">{c}</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2 group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>{p.name}</h3>
                  <p className="text-[0.75rem] text-accent mb-3">{p.tagline}</p>
                  <p className="text-[0.8rem] leading-[1.8] text-muted mb-5 max-w-2xl">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 6).map(s => (
                      <span key={s} className="text-[0.6rem] px-2 py-0.5 border border-white/[0.07] text-muted/80">{s}</span>
                    ))}
                    {p.stack.length > 6 && <span className="text-[0.6rem] text-muted/50">+{p.stack.length - 6}</span>}
                  </div>
                </div>
                <div className="sm:w-44 shrink-0 flex sm:flex-col gap-3">
                  {p.stats.map(s => (
                    <div key={s.label} className="flex-1 border border-white/[0.06] px-3 py-3 text-center" style={{ background: 'var(--bg)' }}>
                      <div className="font-serif text-lg font-bold text-accent">{s.value}</div>
                      <div className="text-[0.52rem] tracking-[0.08em] uppercase text-muted mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-[0.68rem] tracking-[0.1em] uppercase text-accent flex items-center gap-2 group-hover:gap-3 transition-all">View Project <span>→</span></span>
                <div className="flex items-center gap-3">
                  <span className="text-[0.63rem] font-mono text-muted/50">{p.period}</span>
                  <button onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank', 'noopener,noreferrer') }}
                    className="text-muted hover:text-accent transition-colors p-1 cursor-pointer" aria-label="GitHub">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </button>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.filter(p => !p.featured).map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <Link href={`/projects/${p.id}`}
                className="group flex flex-col border p-5 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden h-full"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'var(--surface)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.56rem] tracking-[0.15em] text-muted/60 font-mono">{p.num}</span>
                    <div className="flex gap-1">
                      {p.category.map(c => (
                        <span key={c} className="text-[0.48rem] tracking-[0.08em] uppercase px-1.5 py-0.5 border border-white/[0.07] text-muted/70">{c}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-serif text-[1rem] font-bold mb-1.5 group-hover:text-accent transition-colors leading-snug" style={{ color: 'var(--text)' }}>{p.name}</h3>
                  <p className="text-[0.63rem] text-accent mb-2">{p.tagline}</p>
                  <p className="text-[0.72rem] leading-[1.72] text-muted mb-4 line-clamp-3 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.stack.slice(0, 3).map(s => (
                      <span key={s} className="text-[0.54rem] px-1.5 py-0.5 border border-white/[0.07] text-muted/70">{s}</span>
                    ))}
                    {p.stack.length > 3 && <span className="text-[0.54rem] text-muted/40">+{p.stack.length - 3}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-[0.6rem] tracking-[0.1em] uppercase text-accent flex items-center gap-1 group-hover:gap-2 transition-all">View →</span>
                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank', 'noopener,noreferrer') }}
                      className="text-muted/60 hover:text-accent transition-colors cursor-pointer" aria-label="GitHub">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </button>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-10">
          <Link href="/projects" className="inline-flex items-center gap-3 text-[0.75rem] tracking-[0.15em] uppercase text-muted border border-white/[0.08] px-8 py-3 hover:border-accent/50 hover:text-accent transition-all">
            All Projects →
          </Link>
        </FadeUp>
      </section>

      {/* ══════════ FEATURED PUBLICATION ══════════ */}
      <section className="relative z-10 px-4 sm:px-6 md:px-16 py-16 sm:py-20 max-w-7xl mx-auto">
        <SectionHeader num="04" title="Latest Research" />
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {(() => {
              const pub = [...PUBLICATIONS].reverse().find((p:any) => p.status === 'Published') ?? PUBLICATIONS[0]
              const pubUrl = (pub as any).url
              return (
                <div className="lg:col-span-3 border border-accent/20 p-6 sm:p-8 relative overflow-hidden" style={{ background: 'var(--surface)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent2 to-transparent" />
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[0.58rem] tracking-[0.12em] uppercase px-2.5 py-1 border border-[#34d399]/30 text-[#34d399] bg-[#34d399]/5">Published</span>
                    <span className="text-[0.58rem] font-mono text-muted/60">{pub.year}</span>
                    <span className="text-[0.58rem] tracking-[0.1em] uppercase px-2 py-1 border border-white/[0.07] text-muted/60">{pub.domain}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug mb-3" style={{ color: 'var(--text)' }}>{pub.title}</h3>
                  <p className="text-[0.78rem] leading-[1.8] text-muted mb-5 line-clamp-3">{pub.abstract}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {pub.keywords.slice(0, 5).map((k:string) => (
                      <span key={k} className="text-[0.58rem] px-2 py-0.5 border border-white/[0.07] text-muted/70">{k}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[0.6rem] text-muted/50 font-mono">{pub.journal}</div>
                    </div>
                    {pubUrl ? (
                      <a href={pubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] uppercase px-5 py-2.5 bg-accent text-black font-sans font-bold hover:shadow-[0_8px_24px_rgba(0,212,255,0.35)] hover:-translate-y-px transition-all">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        Read Paper
                      </a>
                    ) : (
                      <Link href="/publications" className="text-[0.68rem] tracking-[0.1em] uppercase px-5 py-2.5 border border-accent/30 text-accent hover:bg-accent/10 transition-all">View Research →</Link>
                    )}
                  </div>
                </div>
              )
            })()}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="border border-white/[0.06] p-5" style={{ background: 'var(--surface)' }}>
                <div className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-4">All Publications</div>
                <div className="space-y-3">
                  {PUBLICATIONS.map((p:any) => (
                    <div key={p.id} className="flex items-start gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${p.status === 'Published' ? 'bg-[#34d399]' : p.status === 'Under Review' ? 'bg-[#a78bfa]' : p.status === 'Ready for Publication' ? 'bg-accent' : 'bg-accent3'}`} />
                      <div>
                        <div className="text-[0.68rem] leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>{p.title.split(':')[0]}</div>
                        <div className="text-[0.58rem] text-muted/50 mt-0.5">{p.journal} · {p.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/publications" className="flex items-center gap-2 mt-4 text-[0.65rem] tracking-[0.1em] uppercase text-accent hover:gap-3 transition-all">View All Research →</Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══════════ CONTACT TEASER ══════════ */}
      <section className="relative z-10 px-4 sm:px-6 md:px-16 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-3 border border-white/[0.08] px-4 py-2 mb-8 text-[0.65rem] font-mono" style={{ background: 'var(--surface)' }}>
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
              </span>
              <span className="text-muted">Currently building:</span>
              <span className="text-accent">Resume Intelligence Engine</span>
            </div>
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">Open to Work</div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight mb-6">
              {"Let's build something"}<br /><span className="gradient-text">remarkable.</span>
            </h2>
            <p className="text-[0.85rem] leading-[1.85] text-muted mb-10 max-w-xl mx-auto">
              Seeking Software Engineer / AI Engineer / Full Stack roles. 2 publications, MS CS 3.35 GPA. Southfield, MI — open to remote.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="clip-btn bg-accent text-black font-sans font-bold text-[0.78rem] tracking-[0.1em] uppercase px-10 py-3.5 hover:shadow-[0_8px_40px_rgba(0,212,255,0.45)] hover:-translate-y-px transition-all">
                Get in Touch
              </Link>
              <Link href="/publications" className="font-sans font-bold text-[0.78rem] tracking-[0.1em] uppercase px-10 py-3.5 border border-white/[0.12] text-muted hover:border-accent/50 hover:text-accent transition-all">
                View Research
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}
