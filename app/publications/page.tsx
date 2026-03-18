'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import ProgressBar from '@/components/ui/ProgressBar'
import SectionHeader from '@/components/ui/SectionHeader'
import { PUBLICATIONS, PERSON } from '@/lib/data'
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
  'Published':           'border-[#34d399]/30 text-[#34d399] bg-[#34d399]/5',
  'In Preparation':      'border-accent3/30 text-accent3 bg-accent3/5',
  'Under Review':        'border-[#a78bfa]/30 text-[#a78bfa] bg-[#a78bfa]/5',
  'Ready for Publication': 'border-accent/30 text-accent bg-accent/5',
}
const DOMAIN_COLOR: Record<string, string> = {
  'Cybersecurity':         'text-[#f87171]',
  'Computer Vision / AI':  'text-[#a78bfa]',
  'Deep Learning / Seismology': 'text-[#34d399]',
  'NLP / Backend AI':      'text-[#34d399]',
}

const ScholarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
)
const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10"/>
  </svg>
)
const DoiIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
  </svg>
)

export default function PublicationsPage() {
  const [expanded, setExpanded] = useState<string | null>(PUBLICATIONS[0].id)
  const publishedCount = PUBLICATIONS.filter(p => p.status === 'Published').length

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
          <h1 className="sr-only">Darshan Joshi — Research Publications</h1>
          <div className="text-[0.65rem] tracking-[0.25em] uppercase text-accent mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-accent" /> Research & Publications
          </div>
          <SectionHeader num="R" title="Publications" />
          <p className="text-[0.85rem] leading-[1.85] text-muted max-w-xl -mt-8 mb-10">
            Peer-reviewed research spanning enterprise cybersecurity, computer vision AI, seismic deep learning, and NLP-driven document intelligence.
          </p>
        </motion.div>

        {/* Stats bar + Scholar link */}
        <FadeUp className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-white/[0.06] divide-x divide-white/[0.06]">
            {[
              { value: String(PUBLICATIONS.length), label: 'Total Publications' },
              { value: String(publishedCount), label: 'Published' },
              { value: String(PUBLICATIONS.filter(p => p.status === 'Under Review' || p.status === 'Ready for Publication').length), label: 'In Pipeline' },
              { value: '4', label: 'Domains' },
            ].map(s => (
              <div key={s.label} className="bg-surface px-4 sm:px-6 py-5 text-center">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-[0.56rem] tracking-[0.12em] uppercase text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Google Scholar CTA */}
          <a href={(PERSON as any).scholar ?? 'https://scholar.google.com'} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between w-full mt-3 border border-white/[0.06] bg-surface px-5 py-3.5 hover:border-accent/30 hover:bg-accent/[0.03] transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-white/[0.08] text-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
                <ScholarIcon />
              </div>
              <div>
                <div className="text-[0.72rem] font-sans font-bold" style={{ color: 'var(--text)' }}>Google Scholar Profile</div>
                <div className="text-[0.62rem] text-muted">View all citations and publications</div>
              </div>
            </div>
            <ExternalLinkIcon />
          </a>
        </FadeUp>

        {/* Publications list */}
        <div className="space-y-5">
          {PUBLICATIONS.map((pub, i) => {
            const isOpen = expanded === pub.id
            const hasUrl = (pub as any).url
            return (
              <FadeUp key={pub.id} delay={i * 0.08}>
                <div className={`border bg-surface overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent/25 shadow-[0_0_40px_rgba(0,212,255,0.06)]' : 'border-white/[0.06] hover:border-white/[0.12]'}`}>

                  {/* Header */}
                  <button onClick={() => setExpanded(isOpen ? null : pub.id)} className="w-full text-left p-5 sm:p-7 group">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent/40 shrink-0 mt-1 hidden sm:block">{pub.num}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 border ${STATUS_STYLE[pub.status] || STATUS_STYLE['Published']}`}>
                            {pub.status}
                          </span>
                          <span className="text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 border border-white/[0.07] text-muted">{pub.type}</span>
                          <span className="text-[0.6rem] font-mono text-muted/60">{pub.year}</span>
                          {(pub as any).citedBy > 0 && (
                            <span className="text-[0.58rem] tracking-[0.08em] uppercase px-2 py-1 border border-accent2/20 text-[#a78bfa] bg-accent2/5">
                              {(pub as any).citedBy} citations
                            </span>
                          )}
                        </div>
                        <h2 className={`font-serif text-base sm:text-xl font-bold leading-snug mb-2 transition-colors ${isOpen ? 'text-accent' : 'group-hover:text-accent/80'}`} style={{ color: isOpen ? undefined : 'var(--text)' }}>
                          {pub.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-[0.72rem]">
                          <span className="text-muted/70 font-mono">{pub.journal}</span>
                          <span className="text-muted/30">·</span>
                          <span className={`font-mono ${DOMAIN_COLOR[pub.domain] || 'text-muted'}`}>{pub.domain}</span>
                        </div>
                      </div>
                      <div className={`self-start sm:self-center text-muted transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded */}
                  <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                    <div className="px-5 sm:px-7 pb-7 border-t border-white/[0.05]">
                      <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left — content */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">Abstract</h4>
                            <p className="text-[0.82rem] leading-[1.85] text-muted">{pub.abstract}</p>
                          </div>
                          <div>
                            <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-accent mb-3">Key Contributions</h4>
                            <ul className="space-y-2">
                              {pub.points.map((pt, j) => (
                                <li key={j} className="flex gap-3 text-[0.8rem] leading-[1.75] text-muted">
                                  <span className="text-accent mt-[3px] shrink-0">›</span>{pt}
                                </li>
                              ))}
                            </ul>
                          </div>
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

                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-3 pt-2">
                            {hasUrl ? (
                              <a href={(pub as any).url} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] uppercase px-5 py-2.5 bg-accent text-black font-sans font-bold hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)] hover:-translate-y-px transition-all">
                                <ExternalLinkIcon />
                                View Paper
                              </a>
                            ) : (
                              <span className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] uppercase px-5 py-2.5 border border-white/[0.08] text-muted/50 cursor-not-allowed">
                                In Preparation
                              </span>
                            )}
                            {(pub as any).doi && (
                              <a href={`https://doi.org/${(pub as any).doi}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2.5 border border-white/[0.08] text-muted hover:border-accent/40 hover:text-accent transition-all">
                                <DoiIcon />
                                DOI
                              </a>
                            )}
                            <a href={(PERSON as any).scholar ?? '#'} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[0.68rem] tracking-[0.1em] uppercase px-4 py-2.5 border border-white/[0.08] text-muted hover:border-accent/40 hover:text-accent transition-all">
                              <ScholarIcon />
                              Google Scholar
                            </a>
                          </div>
                        </div>

                        {/* Right — metadata */}
                        <div className="space-y-4">
                          <div className="border border-white/[0.06] bg-bg/60 p-5 space-y-4">
                            <div>
                              <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-1">Journal / Venue</div>
                              <div className="text-[0.72rem] font-sans font-bold text-accent">{pub.journal}</div>
                              <div className="text-[0.63rem] text-muted/70 mt-0.5 leading-snug">{pub.journalFull}</div>
                            </div>
                            <div className="h-px bg-white/[0.05]" />
                            {pub.highlights.map(h => (
                              <div key={h.label}>
                                <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-0.5">{h.label}</div>
                                <div className="text-[0.78rem] font-sans font-semibold" style={{ color: 'var(--text)' }}>{h.value}</div>
                              </div>
                            ))}
                            <div className="h-px bg-white/[0.05]" />
                            <div>
                              <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted mb-0.5">Status</div>
                              <div className={`text-[0.72rem] font-sans font-bold ${pub.status === 'Published' ? 'text-[#34d399]' : pub.status === 'Under Review' ? 'text-[#a78bfa]' : pub.status === 'Ready for Publication' ? 'text-accent' : 'text-accent3'}`}>{pub.status}</div>
                            </div>
                          </div>

                          {/* APA Citation — copyable */}
                          <div className="border border-white/[0.06] p-4 bg-bg/60">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-[0.58rem] tracking-[0.15em] uppercase text-muted">APA Citation</div>
                              <button
                                onClick={() => navigator.clipboard?.writeText(`Joshi, D. (${pub.year}). ${pub.title}. ${pub.journalFull}.${(pub as any).doi ? ` https://doi.org/${(pub as any).doi}` : ''}`)}
                                className="text-[0.56rem] tracking-[0.1em] uppercase text-muted/50 hover:text-accent transition-colors px-2 py-0.5 border border-white/[0.06] hover:border-accent/30">
                                Copy
                              </button>
                            </div>
                            <p className="text-[0.62rem] leading-[1.7] text-muted/60 font-mono select-all">
                              Joshi, D. ({pub.year}). {pub.title}. <em>{pub.journalFull}</em>.{(pub as any).doi && ` https://doi.org/${(pub as any).doi}`}
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

        {/* Research Interests */}
        <FadeUp delay={0.3} className="mt-20">
          <div className="border border-white/[0.06] bg-surface p-6 sm:p-10">
            <h3 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Research Interests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: '◈', col: 'text-[#a78bfa]', title: 'Computer Vision', desc: 'Real-time object detection, behavior recognition, and Grad-CAM explainability.' },
                { icon: '◉', col: 'text-[#34d399]', title: 'NLP & Document AI', desc: 'Job description parsing, skills extraction, automated career document generation.' },
                { icon: '◎', col: 'text-[#f59e0b]', title: 'Seismic AI', desc: 'CNN-LSTM hybrid models for earthquake prediction and synthetic seismogram generation.' },
                { icon: '◆', col: 'text-[#f87171]', title: 'Cybersecurity', desc: 'Enterprise infrastructure design, buffer overflow analysis, responsible disclosure.' },
                { icon: '⬡', col: 'text-accent', title: 'MLOps & Pipelines', desc: 'Reproducible YAML training workflows, hyperparameter tuning, deployment strategies.' },
                { icon: '◐', col: 'text-[#a78bfa]', title: 'Explainable AI', desc: 'Grad-CAM visualization, model interpretability, responsible AI practices.' },
              ].map(r => (
                <div key={r.title} className="border border-white/[0.06] p-4 hover:border-accent/20 transition-colors group">
                  <div className={`text-lg mb-2 ${r.col}`}>{r.icon}</div>
                  <div className="font-sans font-bold text-[0.82rem] mb-1" style={{ color: 'var(--text)' }}>{r.title}</div>
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
