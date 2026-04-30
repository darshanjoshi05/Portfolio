'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { EDUCATION, SKILL_GROUPS } from '@/lib/data'
import BackBar from '@/components/ui/BackBar'

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

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-[0.7rem] mb-1.5">
        <span className="text-muted">{name}</span>
        <span className="text-accent font-mono">{level}%</span>
      </div>
      <div className="h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
        />
      </div>
    </div>
  )
}

export default function EducationPage() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <BackBar label="Back to Home" href="/" section="Education & Skills" />

      <div className="relative z-10 pt-8 sm:pt-12 pb-32 px-6 md:px-16 max-w-7xl mx-auto">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-20">
          <h1 className="sr-only">Darshan Joshi — Education and Skills</h1>
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" /> Qualifications & Knowledge
          </div>
          <SectionHeader num="04" title="Education" />
        </motion.div>

        {/* Degrees */}
        <FadeUp className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <div key={i}
                className="border border-white/[0.06] bg-surface p-8 relative overflow-hidden hover:border-accent/25 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${i === 0 ? 'bg-gradient-to-r from-accent to-accent2' : 'bg-gradient-to-r from-accent2 to-accent3'}`} />
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className={`text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 border ${i === 0 ? 'border-accent/30 text-accent bg-accent/5' : 'border-accent2/30 text-[#a78bfa] bg-accent2/5'}`}>
                    {edu.type}
                  </span>
                  <span className="text-[0.68rem] font-mono text-muted">{edu.period}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-accent text-[0.82rem] mb-4">{edu.field}</p>
                <p className="text-[0.8rem] text-muted mb-2">{edu.school}</p>
                <p className="text-[0.72rem] text-muted/60 mb-5">{edu.location}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                  <div>
                    <div className="font-serif text-2xl font-bold text-accent">{edu.gpa}</div>
                    <div className="text-[0.58rem] tracking-[0.12em] uppercase text-muted">GPA
                      {edu.gpaNote && <span className="ml-1 text-muted/50">· {edu.gpaNote}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Skills */}
        <FadeUp className="mb-24">
          <SectionHeader num="02" title="Technical Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {SKILL_GROUPS.map((group, gi) => (
              <div key={group.title}>
                <h3 className="text-[0.68rem] tracking-[0.18em] uppercase text-accent mb-5 pb-2 border-b border-white/[0.06]">
                  {group.title}
                </h3>
                {group.items.map((s, si) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={gi * 0.1 + si * 0.06} />
                ))}
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Research teaser */}
        <FadeUp className="mb-16">
          <div className="border border-accent3/20 bg-accent3/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <div className="text-[0.6rem] tracking-[0.18em] uppercase text-accent3 mb-2 flex items-center gap-2">
                <span className="w-4 h-px bg-accent3" /> Publications
              </div>
              <h3 className="font-serif text-xl font-bold mb-1">2 Research Publications</h3>
              <p className="text-[0.78rem] text-muted">Cybersecurity · Seismic AI — view abstracts, contributions &amp; citations.</p>
            </div>
            <a href="/publications"
              className="shrink-0 clip-btn border border-accent3/40 text-accent3 font-sans font-bold text-[0.72rem] tracking-[0.1em] uppercase px-6 py-3 hover:bg-accent3/10 transition-all whitespace-nowrap">
              View Research →
            </a>
          </div>
        </FadeUp>
      </div>

      <Footer />
    </>
  )
}
