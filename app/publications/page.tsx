'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { PUBLICATIONS } from '@/lib/data'
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

const STATUS_STYLE: Record<string, string> = {
  'Published':       'border-[#34d399]/30 text-[#34d399] bg-[#34d399]/5',
  'In Preparation':  'border-accent3/30 text-accent3 bg-accent3/5',
  'Under Review':    'border-accent/30 text-accent bg-accent/5',
}

const DOMAIN_COLOR: Record<string, string> = {
  'Cybersecurity':       'text-[#f87171]',
  'Computer Vision / AI': 'text-[#a78bfa]',
  'NLP / Backend AI':    'text-[#34d399]',
}

export default function PublicationsPage() {
  const [expanded, setExpanded] = useState<string | null>(PUBLICATIONS[0].id)

  return (
    <>
      <ProgressBar />
      <Nav />
      <BackBar label="Back to Home" href="/" section="Research & Publications" />

      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[60%] w-[500px] h-[500px] bg-accent2/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-[60%] left-[20%] w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 pt-44 pb-32 px-4 sm:px-6 md:px-16 max-w-6xl mx-auto">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-6">
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" /> Research & Publications
          </div>
          <SectionHeader num="R" title="Publications" />
          <p className="text-[0.85rem] leading-[1.85] text-muted max-w-xl -mt-8 mb-10">
            Academic research spanning enterprise cybersecurity, computer vision AI, seismic deep learning, and NLP-driven document intelligence.
          </p>
        </motion.div>

        {/* Stats bar */}
        <FadeUp className="mb-16">
          <div className="grid grid-cols-3 border border-white/[0.06] divide-x divide-white/[0.06]">
            {[
              { value: '4', label: 'Publications' },
              { value: '3', label: 'Published' },
              { value: '1', label: 'In Preparation' },
            ].map(s => (
              <div key={s.label} className="bg-surface px-4 sm:px-8 py-5 text-center">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-[0.58rem] tracking-[0.12em] uppercase text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Publications list */}
        <div className="space-y-6">
          {PUBLICATIONS.map((pub, i) => {
            const isOpen = expanded === pub.id
            return (
              <FadeUp key={pub.id} delay={i * 0.1}>
                <div className={`border bg-surface overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/25 shadow-[0_0_40px_rgba(0,212,255,0.06)]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>

                  {/* Header — always visible */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : pub.id)}
                    className="w-full text-left p-5 sm:p-8 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Number */}
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent/50 shrink-0 mt-1 hidden sm:block">
                        {pub.num}
                      </span>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 border ${STATUS_STYLE[pub.status] || STATUS_STYLE['Published']}`}>
                            {pub.status}
                          </span>
                          <span className="text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 border border-white/[0.07] text-muted">
                            {pub.type}
                          </span>
                          <span className="text-[0.6rem] font-mono text-muted/60">{pub.year}</span>
                        </div>

                        {/* Title */}
                        <h2 className={`font-serif text-lg sm:text-xl font-bold leading-snug mb-2 transition-colors ${isOpen ? 'text-accent' : 'text-[#e8f0fe] group-hover:text-accent/80'}`}>
                          {pub.title}
                        </h2>

                        {/* Journal + domain */}
                        <div className="flex flex-wrap items-center gap-3 text-[0.72rem]">
                          <span className="text-muted/70 font-mono">{pub.journal}</span>
                          <span className="text-muted/30">·</span>
                          <span className={`font-mono ${DOMAIN_COLOR[pub.domain] || 'text-muted'}`}>{pub.domain}</span>
                        </div>
                      </div>

                      {/* Expand arrow */}
                      <div className={`self-start sm:self-center text-muted transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 sm:px-8 pb-8 border-t border-white/[0.05]">
                      <div className="pt-7 grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left — main content */}
                        <div className="lg:col-span-2 space-y-6">

                          {/* Abstract */}
                          <div>
                            <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">Abstract</h4>
                            <p className="text-[0.82rem] leading-[1.85] text-muted">{pub.abstract}</p>
                          </div>

                          {/* Key Points */}
                          <div>
                            <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">Key Contributions</h4>
                            <ul className="space-y-2.5">
                              {pub.points.map((pt, j) => (
                                <li key={j} className="flex gap-3 text-[0.8rem] leading-[1.75] text-muted">
                                  <span className="text-accent mt-[3px] shrink-0">›</span>
                                  {pt}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Keywords */}
                          <div>
                            <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">Keywords</h4>
                            <div className="flex flex-wrap gap-2">
                              {pub.keywords.map(k => (
                                <span key={k} className="text-[0.62rem] tracking-[0.06em] uppercase px-2.5 py-1 border border-white/[0.07] text-muted/70 hover:border-accent/30 hover:text-accent transition-all">
                                  {k}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right — metadata */}
                        <div className="space-y-4">
                          {/* Journal info card */}
                          <div className="border border-white/[0.06] bg-bg/60 p-5 space-y-4">
                            <div>
                              <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-1">Journal / Venue</div>
                              <div className="text-[0.72rem] font-sans font-bold text-accent">{pub.journal}</div>
                              <div className="text-[0.65rem] text-muted/70 mt-0.5 leading-snug">{pub.journalFull}</div>
                            </div>
                            <div className="h-px bg-white/[0.05]" />
                            {pub.highlights.map(h => (
                              <div key={h.label}>
                                <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-0.5">{h.label}</div>
                                <div className="text-[0.78rem] font-sans font-semibold text-[#e8f0fe]">{h.value}</div>
                              </div>
                            ))}
                            <div className="h-px bg-white/[0.05]" />
                            <div>
                              <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-0.5">Status</div>
                              <div className={`text-[0.72rem] font-sans font-bold ${pub.status === 'Published' ? 'text-[#34d399]' : 'text-accent3'}`}>{pub.status}</div>
                            </div>
                          </div>

                          {/* Domain badge */}
                          <div className={`border p-4 ${pub.domain.includes('Cyber') ? 'border-[#f87171]/20 bg-[#f87171]/[0.03]' : pub.domain.includes('Vision') ? 'border-[#a78bfa]/20 bg-[#a78bfa]/[0.03]' : 'border-[#34d399]/20 bg-[#34d399]/[0.03]'}`}>
                            <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-1">Research Domain</div>
                            <div className={`text-[0.78rem] font-sans font-bold ${DOMAIN_COLOR[pub.domain]}`}>{pub.domain}</div>
                          </div>

                          {/* Citation placeholder */}
                          <div className="border border-white/[0.06] p-4 bg-bg/60">
                            <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-2">APA Citation</div>
                            <p className="text-[0.62rem] leading-[1.7] text-muted/60 font-mono">
                              Joshi, D. ({pub.year}). {pub.title}. <em>{pub.journalFull}</em>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* Research interests footer */}
        <FadeUp delay={0.3} className="mt-20">
          <div className="border border-white/[0.06] bg-surface p-6 sm:p-10">
            <h3 className="font-serif text-2xl font-bold mb-4">Research Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '🌍', title: 'Seismic AI', desc: 'Hybrid CNN-LSTM models for earthquake prediction and synthetic seismogram generation.' },
                { icon: '🔭', title: 'Computer Vision', desc: 'Real-time object detection, behavior recognition, and model explainability with Grad-CAM.' },
                { icon: '🧠', title: 'NLP & Document AI', desc: 'Job description parsing, skills extraction, and automated career document generation.' },
                { icon: '🛡', title: 'Cybersecurity', desc: 'Enterprise infrastructure design, buffer overflow analysis, and responsible disclosure.' },
                { icon: '⚙', title: 'MLOps & Pipelines', desc: 'Reproducible YAML training workflows, hyperparameter tuning, and deployment strategies.' },
                { icon: '📊', title: 'Explainable AI', desc: 'Grad-CAM visualization, model interpretability, and responsible AI practices.' },
              ].map(r => (
                <div key={r.title} className="border border-white/[0.06] p-4 hover:border-accent/20 transition-colors">
                  <div className="text-xl mb-2">{r.icon}</div>
                  <div className="font-sans font-bold text-[0.82rem] text-[#e8f0fe] mb-1">{r.title}</div>
                  <div className="text-[0.72rem] leading-[1.65] text-muted">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <Footer />
    </>
  )
}
