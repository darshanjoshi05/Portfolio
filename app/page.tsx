'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { PERSON, SKILLS, EXPERIENCE, PROJECTS } from '@/lib/data'

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
    cmd: 'text-accent', out: 'text-[#34d399]', key: 'text-[#a78bfa]', str: 'text-accent3', num: 'text-[#e8f0fe]',
  }

  return (
    <>
      <ProgressBar />
      <Nav />

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroScene />
        {/* gradient overlay — stronger on mobile so text is readable over 3D */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-bg/95 via-bg/70 to-bg/20 pointer-events-none" />

        <div className="relative z-[3] px-4 sm:px-6 md:px-16 pt-24 sm:pt-20 pb-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
            {/* Left */}
            <div>
              {/* Mobile-only circular photo — shown above name on small screens */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex items-center gap-4 mb-5 lg:hidden"
              >
                <div className="relative shrink-0">
                  {/* Accent ring */}
                  <div className="absolute -inset-[3px] rounded-full border border-accent/50 pointer-events-none" />
                  <div className="absolute -inset-[6px] rounded-full border border-accent/20 pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpg"
                    alt="Darshan Joshi"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top border-2 border-accent/40"
                  />
                  {/* Online dot with pulse ring */}
                  <span className="absolute bottom-0.5 right-0.5 flex">
                    <span className="absolute inline-block w-3 h-3 rounded-full bg-[#34d399]/40 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#34d399] border-2 border-bg" />
                  </span>
                </div>
                <div>
                  <div className="text-[0.7rem] font-sans font-bold text-[#e8f0fe]">Darshan Joshi</div>
                  <div className="text-[0.6rem] text-accent tracking-[0.1em] uppercase">AI Engineer</div>
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
                Building real-time computer vision systems, NLP document pipelines, and cybersecurity tools. Research Assistant at Lawrence Tech — 4 publications, 5 EC-Council certs, MS in CS (GPA 3.75/4.0).
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
              {/* Photo frame */}
              <div className="relative w-[220px] self-center">
                <div className="absolute -inset-3 border border-accent/20 pointer-events-none" />
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-accent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photo.jpg" alt="Darshan Joshi" className="w-full aspect-square object-cover object-top" />
              </div>

              {/* Terminal */}
              <div className="bg-[#0a0f1a] border border-accent/10 rounded-sm p-4 font-mono text-[0.65rem] leading-[1.7]">
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
            {/* Photo — desktop only, also shown in about sidebar */}
            <FadeUp>
              <div className="relative w-32 mb-6 hidden lg:block">
                <div className="absolute -inset-2 border border-accent/15 pointer-events-none" />
                <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 border-accent" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/photo.jpg" alt="Darshan Joshi" className="w-full aspect-square object-cover object-top" />
              </div>
            </FadeUp>

            {[
              { label: 'Location', val: PERSON.location },
              { label: 'Status', val: 'Open to Opportunities', accent: true },
              { label: 'Degree', val: "M.S. Computer Science" },
              { label: 'GPA', val: '3.75 / 4.0', accent: true },
              { label: 'Publications', val: '4 Research Papers', accent: true },
              { label: 'Email', val: PERSON.email },
            ].map((r, i) => (
              <FadeUp key={r.label} delay={i * 0.06}>
                <div className="flex justify-between items-start py-3 border-b border-white/[0.05]">
                  <span className="text-[0.65rem] tracking-[0.12em] uppercase text-muted">{r.label}</span>
                  <span className={`text-[0.75rem] font-mono ${r.accent ? 'text-accent' : 'text-[#e8f0fe]'}`}>{r.val}</span>
                </div>
              </FadeUp>
            ))}

            {/* Resume download CTA */}
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
          {/* timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px timeline-line" />

          {EXPERIENCE.map((exp, i) => (
            <FadeUp key={i} delay={0.1}>
              <div className="relative mb-16 last:mb-0">
                {/* dot */}
                <div className="absolute -left-[25px] md:-left-[49px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-bg shadow-[0_0_12px_rgba(0,212,255,0.6)]" />

                <div className="border border-white/[0.06] bg-surface p-8 hover:border-accent/20 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-sans font-bold text-xl text-[#e8f0fe] mb-1">{exp.role}</h3>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <Link href={`/projects/${p.id}`}
                className={`group block border border-white/[0.06] bg-surface p-6 hover:border-accent/30 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden ${p.featured ? 'md:col-span-2' : ''}`}>

                {/* bg glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.62rem] tracking-[0.15em] text-muted font-mono">{p.num}</span>
                    <div className="flex gap-1.5">
                      {p.category.map(c => (
                        <span key={c} className="text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 border border-white/[0.08] text-muted">{c}</span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-[0.72rem] text-accent mb-3">{p.tagline}</p>
                  <p className="text-[0.78rem] leading-[1.75] text-muted mb-5 line-clamp-3">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.stack.slice(0, 5).map(s => (
                      <span key={s} className="text-[0.6rem] tracking-[0.06em] px-2 py-0.5 border border-white/[0.06] text-muted/80">{s}</span>
                    ))}
                    {p.stack.length > 5 && <span className="text-[0.6rem] text-muted/50">+{p.stack.length - 5}</span>}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[0.68rem] tracking-[0.1em] uppercase text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Project <span>→</span>
                    </span>
                    <button
                      onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(p.github, '_blank', 'noopener,noreferrer') }}
                      className="text-muted hover:text-accent transition-colors p-1 cursor-pointer"
                      aria-label="View on GitHub"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="text-center mt-12">
          <Link href="/projects" className="inline-flex items-center gap-3 text-[0.75rem] tracking-[0.15em] uppercase text-muted border border-white/[0.08] px-8 py-3 hover:border-accent/50 hover:text-accent transition-all">
            All Projects → 
          </Link>
        </FadeUp>
      </section>

      {/* ══════════ CONTACT TEASER ══════════ */}
      <section className="relative z-10 px-4 sm:px-6 md:px-16 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4">Open to Work</div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight mb-6">
              Let's build something<br /><span className="gradient-text">remarkable.</span>
            </h2>
            <p className="text-[0.85rem] leading-[1.85] text-muted mb-10 max-w-xl mx-auto">
              I'm actively looking for roles in AI engineering, computer vision, backend, and cybersecurity. Let's talk.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="clip-btn bg-accent text-black font-sans font-bold text-[0.78rem] tracking-[0.1em] uppercase px-10 py-3.5 hover:shadow-[0_8px_40px_rgba(0,212,255,0.45)] hover:-translate-y-px transition-all">
                Get in Touch
              </Link>
              <a href={PERSON.github} target="_blank" rel="noopener noreferrer"
                className="font-sans font-bold text-[0.78rem] tracking-[0.1em] uppercase px-10 py-3.5 border border-white/[0.12] text-muted hover:border-accent/50 hover:text-accent transition-all flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </>
  )
}
