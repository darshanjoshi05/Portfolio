'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import ArchDiagram from '@/components/ui/ArchDiagram'
import GalleryMock from '@/components/ui/GalleryMock'
import InsightsEditor from '@/components/ui/InsightsEditor'
import BackBar from '@/components/ui/BackBar'
import { Project, PROJECTS } from '@/lib/data'

const ProjectScene = dynamic(() => import('@/components/three/ProjectScene'), { ssr: false })

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

export default function ProjectDetail({ project }: { project: Project }) {
  const idx  = PROJECTS.findIndex(p => p.id === project.id)
  const prev = PROJECTS[idx - 1]
  const next = PROJECTS[idx + 1]

  return (
    <>
      <ProgressBar />
      <Nav />
      <BackBar label="Back to Projects" href="/projects" section={`Project ${project.num} · ${project.overview.type}`} />

      {/* ══════ HERO ══════ */}
      {/* pt must clear: Nav (~64px) + BackBar (~36px) + breathing room = 120px min */}
      <section className="relative w-full" style={{ background: 'var(--bg)', paddingTop: '140px', paddingBottom: '64px' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }} />

        <div className="relative z-10 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-6">
              <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
              <span className="opacity-40">›</span>
              <span className="text-accent/70">{project.category[0]}</span>
            </div>

            <div className="text-[0.68rem] tracking-[0.2em] uppercase text-accent mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" /> {project.num} — {project.overview.type}
            </div>

            <h1 className="font-serif font-bold tracking-[-0.03em] mb-6 max-w-3xl"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)', lineHeight: 1.05, overflow: 'visible' }}>
              <span className="gradient-text" style={{ display: 'inline-block', paddingBottom: '0.08em' }}>{project.name}</span>
            </h1>

            <p className="text-[0.88rem] leading-[1.85] text-muted max-w-2xl mb-8">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.stack.map(s => (
                <span key={s} className="text-[0.63rem] tracking-[0.08em] uppercase px-3 py-1 border border-accent/25 text-accent bg-accent/5">{s}</span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.72rem] tracking-[0.1em] uppercase border border-white/[0.12] text-muted px-5 py-2.5 hover:border-accent/50 hover:text-accent transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
              <div className="flex gap-6">
                {project.stats.map(s => (
                  <div key={s.label}>
                    <div className="font-serif text-xl font-bold text-accent">{s.value}</div>
                    <div className="text-[0.58rem] tracking-[0.1em] uppercase text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ MAIN CONTENT ══════ */}
      <div className="relative z-10 px-4 sm:px-6 md:px-16 py-12 max-w-7xl mx-auto space-y-24">

        {/* Overview strip */}
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.06] overflow-hidden"
            style={{ background: 'var(--surface)' }}>
            {Object.entries(project.overview).map(([k, v], i) => (
              <div key={k} className={`px-6 py-5 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
                <div className="text-[0.58rem] tracking-[0.18em] uppercase text-muted mb-1">{k}</div>
                <div className={`font-sans font-bold text-[0.88rem] ${
                  v.toLowerCase().includes('active') || v.toLowerCase().includes('current') || v.toLowerCase().includes('development')
                    ? 'text-accent' : ''
                }`} style={{ color: v.toLowerCase().includes('active') || v.toLowerCase().includes('current') || v.toLowerCase().includes('development') ? undefined : 'var(--text)' }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── 3D Architecture Scene ── */}
        <FadeUp>
          <SectionHeader num="01" title="System Architecture · 3D View" />
          <ProjectScene project={project} />
        </FadeUp>

        {/* ── Architecture Diagram ── */}
        <FadeUp>
          <SectionHeader num="02" title="Architecture Diagram" />
          <ArchDiagram arch={project.architecture} />
        </FadeUp>

        {/* ── Gallery / Output ── */}
        <FadeUp>
          <SectionHeader num="03" title="Screenshots & Output" />
          <GalleryMock items={project.gallery.map(g => ({ ...g, projectId: project.id }))} />
        </FadeUp>

        {/* ── What I Built ── */}
        <FadeUp>
          <SectionHeader num="04" title="What I Built" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.bullets.map((b, i) => (
              <div key={i} className="flex gap-4 border border-white/[0.06] p-5 hover:border-accent/20 transition-colors"
                style={{ background: 'var(--surface)' }}>
                <span className="text-accent text-lg shrink-0 mt-0.5">›</span>
                <p className="text-[0.8rem] leading-[1.75] text-muted">{b}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ── Project Insights ── */}
        <FadeUp>
          <SectionHeader num="05" title="Project Insights" />
          <InsightsEditor projectId={project.id} defaultValue={project.insights} />
        </FadeUp>

        {/* ── Project navigation ── */}
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/[0.06] pt-12">
            <div>
              {prev && (
                <Link href={`/projects/${prev.id}`}
                  className="group flex flex-col gap-1 border border-white/[0.06] p-5 hover:border-accent/25 transition-all"
                  style={{ background: 'var(--surface)' }}>
                  <span className="text-[0.6rem] tracking-[0.15em] uppercase text-muted flex items-center gap-2">← Previous</span>
                  <span className="font-sans font-bold text-sm group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>{prev.name}</span>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Link href="/projects"
                className="text-[0.7rem] tracking-[0.15em] uppercase text-muted border border-white/[0.06] px-5 py-2 hover:border-accent/40 hover:text-accent transition-all">
                All Projects
              </Link>
            </div>
            <div>
              {next && (
                <Link href={`/projects/${next.id}`}
                  className="group flex flex-col gap-1 border border-white/[0.06] p-5 hover:border-accent/25 transition-all text-right"
                  style={{ background: 'var(--surface)' }}>
                  <span className="text-[0.6rem] tracking-[0.15em] uppercase text-muted flex items-center gap-2 justify-end">Next →</span>
                  <span className="font-sans font-bold text-sm group-hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>{next.name}</span>
                </Link>
              )}
            </div>
          </div>
        </FadeUp>
      </div>

      <Footer />
    </>
  )
}
